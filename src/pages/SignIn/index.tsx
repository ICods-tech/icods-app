import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  HelpButtonContainer,
  HelpButtonText,
  HelpContainer,
  HelpContainerTexts, RegisterAndPassowordForgotContainer,
  SafeAreaView,
  ScrollContainer,
  SignInOptions,
  SpacingContainer,
  SpacingLine,
  SpacingText
} from './styles';

import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { AuthFooter } from '../../components/Authentication/AuthFooter';
import { Header } from '../../components/Authentication/Header';
import { SubmitButton } from '../../components/SubmitButton';
import { useAuth } from '../../hooks/auth';

import { Password, User } from 'react-native-iconly';
import { LOG } from '../../config';

import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import handleLinkNavigation from '../../utils/handleLinkNavigation';
import { displayToast } from '../../utils/Toast';

const log = LOG.extend('Signin');

const SignIn = () => {
  const theme = useTheme();
  const { signIn, user } = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errored, setErrored] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      await signIn({ email, password });
      await analytics().logLogin({ method: 'api' });
      setErrored(false);
    } catch (error: any) {
      setErrored(true);

      displayToast({
        message1: 'Email/Password ou senha incorretos',
        type: 'error',
        duration: 1000,
      })
      setIsLoading(false);
      log.error(error.message);
    }
  }, [email, password]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [Keyboard]);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isKeyboardVisible={isKeyboardVisible} />

          <ScrollContainer>
            <SignInOptions>
              <Input
                ref={emailRef}
                autoCorrect={false}
                autoCapitalize="none"
                iconly={User}
                isErrored={errored}
                defaultValue={email}
                keyboardType="email-address"
                onChangeText={setEmail}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                placeholder="E-mail/Usuário"
                returnKeyType="next"
                setIsSignInErrored={setErrored}
                value={email}
              />

              <PasswordInput
                ref={passwordInputRef}
                iconly={Password}
                isErrored={errored}
                defaultValue={password}
                placeholder="Senha"
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                returnKeyType="send"
                setIsSignInErrored={setErrored}
                value={password}
              />

              <RegisterAndPassowordForgotContainer>
                <HelpButtonContainer
                  onPress={() => {
                    setErrored(false);
                    navigation.navigate('Register');
                  }}>
                  <HelpButtonText textColor={theme.colors.primary}>
                    Cadastre-se
                  </HelpButtonText>
                </HelpButtonContainer>

                <HelpButtonContainer onPress={() => {
                  setErrored(false);
                  navigation.navigate("ForgotPassword");
                }}>
                  <HelpButtonText textColor={theme.colors.text}>
                    Esqueceu a senha?
                  </HelpButtonText>
                </HelpButtonContainer>
              </RegisterAndPassowordForgotContainer>

              <SubmitButton
                enabled={!!email && !!password && !isLoading}
                loading={isLoading}
                onPress={() => handleLogin()}
                text="Entrar"
              />
              <SpacingContainer>
                <SpacingLine style={{ width: '40%' }}></SpacingLine>
                <SpacingText>Ou</SpacingText>
                <SpacingLine style={{ width: '40%' }}></SpacingLine>
              </SpacingContainer>

              {/* <LoginButtonContainer>
                <LoginSocialButton
                  title="Entrar com Google"
                  icon={GoogleIcon}
                  onPress={() => { }}
                />

                <LoginSocialButton
                  title="Entrar com Facebook"
                  icon={FacebookIcon}
                  onPress={() => { }}
                />

              </LoginButtonContainer> */}

              <HelpContainer>
                <HelpContainerTexts style={{ marginRight: RFValue(2) }}>
                  Algum problema no login?
                </HelpContainerTexts>

                <HelpButtonContainer onPress={() => handleLinkNavigation("https://icods.com.br")}>
                  <HelpButtonText textColor={theme.colors.primary}>
                    Contate-nos
                  </HelpButtonText>
                </HelpButtonContainer>
              </HelpContainer>
            </SignInOptions>



            <AuthFooter />
          </ScrollContainer>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
