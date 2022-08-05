import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Message} from 'react-native-iconly';
import * as Yup from 'yup';
import {Header} from '../../components/Authentication/Header';
import {BackButton} from '../../components/BackButton';
import {WarningModal} from '../../components/WarningModal';
import {LOG} from '../../config';
import theme from '../../global/styles/theme';
import api from '../../services/api';
import {checkConnection} from '../../utils/checkConnection';
import {delay} from '../../utils/delay';
import {displayToast} from '../../utils/Toast';

import {SubmitButton} from '../../components/SubmitButton';
import {
  BackButtonContainer,
  Container,
  ContainerButton,
  ForgotPasswordForm,
  ForgotPasswordFormLabel,
  ForgotPasswordFormTextInput,
  InfoSendEmailContainer,
  InfoSendEmailText,
  SafeAreaView,
} from './styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = LOG.extend('ForgotPassword');

const emailSchema = Yup.object().shape({
  email: Yup.string().required().email('Email inválido'),
});

const ForgotPassword = () => {
  const TIME_TO_SEND_EMAIL = 60;
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [activeSendButton, setActiveSendButton] = useState(true);
  const [count, setCount] = useState(TIME_TO_SEND_EMAIL);
  const [isVisible, setIsVisible] = useState(false);

  async function handleCloseModal() {
    setIsVisible(false);
    navigation.navigate('RedefinePassword', {
      email: email,
    });
  }
  async function timeoutCloseModal() {
    await delay(4000);
    setIsVisible(false);
    navigation.navigate('RedefinePassword', {
      email: email,
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSendButton, count]);

  const handleSend = () => {
    emailSchema
      .validate({email})
      .then(async () => {
        try {
          const connection = await checkConnection();
          if (!connection) {
            navigation.navigate('ConnectionProblems');
            return;
          }
          await api.patch('resetPasswordWithoutPass', {
            email,
          });
        } catch (error) {
          console.error(error);
        }
        setActiveSendButton(false);
        setIsVisible(true);
        timeoutCloseModal();
        setCount(TIME_TO_SEND_EMAIL);
      })
      .catch((err) => {
        return displayToast({
          message1: err.message,
          type: 'error',
        });
      });
  };

  const handleBackButton = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isKeyboardVisible={false} />
          <BackButtonContainer>
            <BackButton
              navigationTo="WAIT"
              customFunction={handleBackButton}
              color="white"
            />
          </BackButtonContainer>
          <ForgotPasswordForm>
            <ForgotPasswordFormLabel>
              Por favor, informe abaixo o e-mail utilizado no cadastro:
            </ForgotPasswordFormLabel>

            <ForgotPasswordFormTextInput
              autoCorrect
              autoCapitalize="none"
              defaultValue={email}
              placeholder="E-mail"
              placeholderTextColor={theme.colors.subtitle}
              onChangeText={(email: string) => setEmail(email)}
              onSubmitEditing={handleSend}
              value={email}
              returnKeyType="send"
              editable={activeSendButton}
              keyboardType="email-address"
            />
            <ContainerButton>
              <SubmitButton
                onPress={handleSend}
                enabled={!!email}
                text="Receber e-mail de confirmação"
              />
            </ContainerButton>
          </ForgotPasswordForm>
        </Container>
      </TouchableWithoutFeedback>

      <WarningModal
        title="Enviamos um e-mail para você"
        description="Cheque nas caixa de entrada e spam só para garantir ;)"
        visible={isVisible}
        iconly={Message}
        iconBackgroundColor={theme.colors.primary}
        onCloseModal={handleCloseModal}
      />
    </SafeAreaView>
  );
};

export {ForgotPassword};
