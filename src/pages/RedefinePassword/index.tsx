import React, { useRef, useState } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import { Header } from "../../components/Authentication/Header";
import { BackButton } from "../../components/BackButton";
import NewInput from "../../components/NewInput";
import { Container, SafeAreaView, BackButtonContainer, RedefinePasswordForm, RedefinePasswordFormLabel, NicknameContainer, Teste, NicknameText, InputContainer, SpacingLine, RedefinePasswordFormSendButton, RedefinePasswordFormSendButtonContainer, RedefinePasswordFormSendButtonLabel } from './styles';
import KeyIcon from '../../assets/images/Icons/signIn-password.svg';
import theme from "../../global/styles/theme";
import Toast from "react-native-toast-message";
import { checkConnection } from "../../utils/checkConnection";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

import { LOG } from '../../config';
const log = LOG.extend('RedefinePassword');



const RedefinePassword = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const [password, setpassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirmation, setSecureConfirmation] = useState(true);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [inputFocusObserver, setInputFocusObserver] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleForgotPassword = async () => {
    if (password == '' || passwordConfirmation == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Para prosseguir, complete os campos de senha',
        text2: '',
        visibilityTime: 1000,
        bottomOffset: 100,
      });

      setIsErrored(true);

      return;
    }

    if (password !== passwordConfirmation) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'As senhas não conferem',
        text2: '',
        visibilityTime: 1000,
        bottomOffset: 100,
      });

      setIsErrored(true);

      return;
    }


    const connection = await checkConnection();
    if (!connection) {
      navigation.navigate('ConnectionProblems');
      return;
    }

    try {
      await api.patch('resetPasswordTempPass', {
        emaiil: '',
        tempPassword: '',
        newPassword: password
      });


      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sua senha foi alterada com sucesso',
        visibilityTime: 1200,
        bottomOffset: 100,
      });
    } catch (error: any) {
      log.error(error.message);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: error.message,
        text2: '',
        visibilityTime: 1000,
        bottomOffset: 100,
      });
    }


  }

  return(
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isInputFocus={isInputFocus}/>
          <BackButtonContainer>
            <BackButton navigationTo='SignIn' color='white' />
          </BackButtonContainer>

          <RedefinePasswordForm>
            <RedefinePasswordFormLabel>
              Copie e cole aqui a senha temporária que enviamos para seu email:
            </RedefinePasswordFormLabel>

            <NicknameContainer>
              <NicknameText>Raphael</NicknameText>
            </NicknameContainer>

            <RedefinePasswordFormLabel>
              Agora é só completar o dados a seguir:
            </RedefinePasswordFormLabel>

            <InputContainer isErrored={isErrored}>
              <NewInput
                ref={passwordInputRef}
                passwordStyleInput
                icon={KeyIcon}
                placeholder="Nova senha"
                placeholderTextColor={theme.colors.subtitle}
                secure={secure}
                secureTextEntry={secure}
                setSecure={setSecure}
                defaultValue={password}
                onChangeText={(password: string) => setpassword(password)}
                onSubmitEditing={() => passwordConfirmationInputRef.current?.focus()}
                returnKeyType="next"
                onFocus={() => {setIsInputFocus(true), setInputFocusObserver(true)}}
              />

              <SpacingLine isErrored={isErrored}/>

              <NewInput
                ref={passwordConfirmationInputRef}
                passwordStyleInput
                icon={KeyIcon}
                placeholder="Nova senha"
                placeholderTextColor={theme.colors.subtitle}
                secure={secureConfirmation}
                secureTextEntry={secureConfirmation}
                setSecure={setSecureConfirmation}
                defaultValue={passwordConfirmation}
                onChangeText={(passwordConfirmation: string) => setPasswordConfirmation(passwordConfirmation)}
                onSubmitEditing={handleForgotPassword}
                returnKeyType="send"
                onFocus={() => {setIsInputFocus(true), setInputFocusObserver(true)}}
              />
            </InputContainer>

            <RedefinePasswordFormSendButton>
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
  )
}

export default RedefinePassword;
