import React, { useCallback, useRef, useState } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import { Header } from "../../components/Authentication/Header";
import { BackButton } from "../../components/BackButton";
import NewInput from "../../components/PasswordInput";
import {
  Container,
  SafeAreaView,
  BackButtonContainer,
  RedefinePasswordForm,
  RedefinePasswordFormLabel,
  NicknameContainer,
  NicknameText,
  InputContainer,
  SpacingLine,
  RedefinePasswordFormSendButton,
  RedefinePasswordFormSendButtonContainer,
  RedefinePasswordFormSendButtonLabel,
} from "./styles";
import theme from "../../global/styles/theme";
import Toast from "react-native-toast-message";
import { checkConnection } from "../../utils/checkConnection";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { LOG } from "../../config";
import PasswordInput from "../../components/PasswordInput";
const log = LOG.extend("RedefinePassword");
import { Message, Password } from 'react-native-iconly'

const RedefinePassword = ({ route, _ }: any) => {
  const navigation = useNavigation<any>();
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const [password, setpassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [inputFocusObserver, setInputFocusObserver] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const { email, pass } = route.params;

  const displayToast = ({ text1, type }: { text1: string, type: string }) => {
    return Toast.show({
      type,
      position: "bottom",
      text1,
      text2: "",
      visibilityTime: 1000,
      bottomOffset: 100,
    });
  }



  const handleRedefinePassword = useCallback(async () => {
    try {

      if (!password.length || !passwordConfirmation.length) {
        displayToast({ text1: "Para prosseguir, complete os campos de senha", type: "error" });
        setIsErrored(true);
        return;
      }

      if (password !== passwordConfirmation) {
        displayToast({ text1: "As senhas não conferem", type: "error" });
        setIsErrored(true);
        return;
      }

      const connection = await checkConnection();
      if (!connection) {
        navigation.navigate("ConnectionProblems" as any);
        return;
      }
      await api.patch('resetPasswordTempPass', {
        email,
        tempPassword: pass,
        newPassword: password,
        passwordConfirmation
      })

      displayToast({ text1: "Sua senha foi alterada com sucesso", type: "success" });
      navigation.navigate('SignIn')
    } catch (error: any) {
      displayToast({
        text1: error?.message,
        type: "error",
      })
      log.error(error)
      setIsErrored(true)
    }

  }, [email, pass, password, passwordConfirmation])


  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isKeyboardVisible={isInputFocus} />
          <BackButtonContainer>
            <BackButton navigationTo="SignIn" color="white" />
          </BackButtonContainer>

          <RedefinePasswordForm>
            <RedefinePasswordFormLabel>
              Copie e cole aqui a senha temporária que enviamos para seu email:
            </RedefinePasswordFormLabel>

            <NicknameContainer>
              <NicknameText>{pass}</NicknameText>
            </NicknameContainer>

            <RedefinePasswordFormLabel>
              Agora é só completar o dados a seguir:
            </RedefinePasswordFormLabel>

            <InputContainer isErrored={isErrored}>
              <PasswordInput
                ref={passwordInputRef}
                iconly={Password}
                placeholder="Nova senha"
                placeholderTextColor={theme.colors.subtitle}
                defaultValue={password}
                onChangeText={(password: string) => setpassword(password)}
                onSubmitEditing={() =>
                  passwordConfirmationInputRef.current?.focus()
                }
                returnKeyType="next"
                value={password}
                onFocus={() => {
                  setIsInputFocus(true), setInputFocusObserver(true);
                }}
              />

              <SpacingLine isErrored={isErrored} />

              <PasswordInput
                ref={passwordConfirmationInputRef}
                iconly={Password}
                placeholder="Nova senha"
                placeholderTextColor={theme.colors.subtitle}
                defaultValue={passwordConfirmation}
                value={passwordConfirmation}
                onChangeText={(passwordConfirmation: string) =>
                  setPasswordConfirmation(passwordConfirmation)
                }
                onSubmitEditing={handleRedefinePassword}
                returnKeyType="send"
                onFocus={() => {
                  setIsInputFocus(true), setInputFocusObserver(true);
                }}
              />
            </InputContainer>

            <RedefinePasswordFormSendButton onPress={handleRedefinePassword}>
              <RedefinePasswordFormSendButtonContainer>
                <RedefinePasswordFormSendButtonLabel>
                  Alterar senha
                </RedefinePasswordFormSendButtonLabel>
              </RedefinePasswordFormSendButtonContainer>
            </RedefinePasswordFormSendButton>
          </RedefinePasswordForm>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RedefinePassword;