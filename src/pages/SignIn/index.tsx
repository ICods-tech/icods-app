import React, {useState, useCallback, useRef, useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native';
import {
  Container,
  HelpButtonContainer,
  HelpButtonText,
  HelpContainer,
  HelpContainerTexts,
  LoginButtonContainer,
  RegisterAndPassowordForgotContainer,
  SafeAreaView,
  ScrollContainer,
  SignInOptions,
  SpacingContainer,
  SpacingLine,
  SpacingText,
} from './styles';

import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {AuthFooter} from '../../components/Authentication/AuthFooter';
import analytics from '@react-native-firebase/analytics';
import {Header} from '../../components/Authentication/Header';
import {SubmitButton} from '../../components/Authentication/SubmitButton';
import {LoginSocialButton} from '../../components/Authentication/LoginSocialButton';

import GoogleIcon from '../../assets/images/Icons/google_icon.svg';
import NewInput from '../../components/NewInput';
import FacebookIcon from '../../assets/images/Icons/facebook_icon.svg';
import KeyIcon from '../../assets/images/Icons/signIn-password.svg';
import UserIcon from '../../assets/images/Icons/signIn-user.svg';
import Toast from 'react-native-toast-message';
import {LOG} from '../../config';
const log = LOG.extend('Signin');

const SignIn = () => {
  const theme = useTheme();
  const {signIn, user} = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>(''); //jorgeoreidafloresta@gmail.com'
  const [password, setPassword] = useState<string>(''); // 'jorgeorei'
  const [errored, setErrored] = useState<boolean>(false);
  const [secure, setSecure] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const handleLogin = useCallback(async () => {
    try {
      await signIn({email, password});
      navigation.navigate('Dashboard');
      await analytics().logLogin({method: 'api'});
      setErrored(false);
    } catch (error: any) {
      setErrored(true);

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Email/Password ou senha incorretos',
        text2: '',
        visibilityTime: 1000,
        bottomOffset: 100,
      });

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
              <NewInput
                ref={emailRef}
                autoCorrect={false}
                autoCapitalize="none"
                icon={UserIcon}
                isErrored={errored}
                keyboardType="email-address"
                placeholder="E-mail"
                defaultValue={email}
                onChangeText={(email: string) => setEmail(email)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                returnKeyType="next"
                onFocus={() => setErrored(false)}
              />

              <NewInput
                ref={passwordInputRef}
                icon={KeyIcon}
                isErrored={errored}
                passwordStyleInput
                placeholder="Senha"
                secure={secure}
                secureTextEntry={secure}
                setSecure={setSecure}
                defaultValue={password}
                onChangeText={(password: string) => setPassword(password)}
                onSubmitEditing={() => handleLogin()}
                returnKeyType="send"
                onFocus={() => setErrored(false)}
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

                <HelpButtonContainer>
                  <HelpButtonText textColor={theme.colors.text}>
                    Esqueceu a senha?
                  </HelpButtonText>
                </HelpButtonContainer>
              </RegisterAndPassowordForgotContainer>

              <SubmitButton onPress={() => handleLogin()} text="Entrar" />
              <SpacingContainer>
                <SpacingLine style={{width: '40%'}}></SpacingLine>
                <SpacingText>Ou</SpacingText>
                <SpacingLine style={{width: '40%'}}></SpacingLine>
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
                <HelpContainerTexts style={{marginRight: RFValue(2)}}>
                  Algum problema no login?
                </HelpContainerTexts>

                <HelpButtonContainer>
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
