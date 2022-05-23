import React, { useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import { Header } from "../../components/Authentication/Header";
import { BackButton } from "../../components/BackButton";
import theme from "../../global/styles/theme";
import api from "../../services/api";
import {
  BackButtonContainer,
  Container,
  ForgotPasswordForm,
  ForgotPasswordFormLabel,
  ForgotPasswordFormSendButton,
  ForgotPasswordFormSendButtonContainer,
  ForgotPasswordFormSendButtonLabel,
  ForgotPasswordFormTextInput,
  InfoSendEmailContainer,
  InfoSendEmailText,
  SafeAreaView,
} from "./styles";
import { LOG } from "../../config";
import { ForgotPasswordPopUP } from "../../components/ForgotPassword/ForgotPasswordModal";
import { checkConnection } from "../../utils/checkConnection";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { WarningModal } from "../../components/WarningModal";
import { Message } from "react-native-iconly";
const log = LOG.extend("ForgotPassword");

const ForgotPassword = () => {
  const TIME_TO_SEND_EMAIL = 60;
  const navigation = useNavigation();
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<TextInput>(null);
  const [activeSendButton, setActiveSendButton] = useState(true);
  const [count, setCount] = useState(TIME_TO_SEND_EMAIL);
  const [isVisible, setIsVisible] = useState(false);

  function handleOpenModal() {
    setIsVisible(true)
  }
  function handleCloseModal() {
    setIsVisible(false)
  }
  const timerToActiveButton = () => {
    setCount(count - 1);
    if (count == 0) {
      setActiveSendButton(true);
    }
  };

  useEffect(() => {
    if (!activeSendButton) {
      const timer = setInterval(timerToActiveButton, 1000);
      return () => clearInterval(timer);
    }
  }, [activeSendButton, count]);

  const handleSend = async () => {
    if (email === "") {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Para prosseguir, complete o campo e-mail",
        text2: "",
        visibilityTime: 1000,
        bottomOffset: 100,
      });
      return;
    }

    const connection = await checkConnection();
    if (!connection) {
      navigation.navigate("ConnectionProblems" as any);
      return;
    }

    const response = await api.patch("resetPasswordWithoutPass", {
      email,
    });

    setActiveSendButton(false);
    setIsVisible(true);
    setCount(TIME_TO_SEND_EMAIL);
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isKeyboardVisible={false} />
          <BackButtonContainer isKeyboardVisible={isInputFocus}>
            <BackButton navigationTo="SignIn" color="white" />
          </BackButtonContainer>
          <ForgotPasswordForm>
            <ForgotPasswordFormLabel>
              Por favor, informe abaixo o e-mail utilizado no cadastro:
            </ForgotPasswordFormLabel>

            <ForgotPasswordFormTextInput
              autoCorrect
              autoCapitalize="words"
              defaultValue={email}
              placeholder="E-mail"
              placeholderTextColor={theme.colors.subtitle}
              onChangeText={(email: string) => setEmail(email)}
              onFocus={() => setIsInputFocus(true)}
              onSubmitEditing={handleSend}
              value={email}
              returnKeyType="send"
              editable={activeSendButton}
            />

            <ForgotPasswordFormSendButton
              onPress={handleSend}
              disabled={!activeSendButton}
            >
              <ForgotPasswordFormSendButtonContainer active={activeSendButton}>
                <ForgotPasswordFormSendButtonLabel>
                  Receber e-mail de confirmação
                </ForgotPasswordFormSendButtonLabel>
              </ForgotPasswordFormSendButtonContainer>
            </ForgotPasswordFormSendButton>
          </ForgotPasswordForm>
        </Container>
      </TouchableWithoutFeedback>

      {/* <ForgotPasswordPopUP isVisible={isVisible} setIsVisible={setIsVisible} /> */}
      <WarningModal
        title="Enviamos um e-mail para você"
        description="Cheque nas caixa de entrada e spam só para garantir ;)"
        visible={isVisible}
        iconly={Message}
        iconBackgroundColor={theme.colors.primary}
        pressedOut={handleCloseModal}
      />
      {!activeSendButton && (
        <InfoSendEmailContainer>
          <InfoSendEmailText isBlue={false}>
            Não recebeu o e-mail?{" "}
            <InfoSendEmailText isBlue>Aguarde {count}s </InfoSendEmailText>
            para receber novamente
          </InfoSendEmailText>
        </InfoSendEmailContainer>
      )}
    </SafeAreaView>
  );
};

export { ForgotPassword };