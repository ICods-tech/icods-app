import { useAuth } from '../../hooks/auth'
import Toast from 'react-native-toast-message';
import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from 'react-native'
import {
  Container,
  HelpButtonContainer,
  HelpButtonText,
  HelpContainer,
  HelpContainerTexts,
  InputContainer,
  LoginButtonContainer,
  RegisterAndPassowordForgotContainer,
  ScrollContainer,
  SignInOptions,
  SpacingContainer,
  SpacingLine,
  SpacingText,
} from './newStyles';

import FooterAuthentication from '../../components/Authentication/AuthFooter';
import { Header } from '../../components/Authentication/Header';
import { SubmitButton } from '../../components/Authentication/SubmitButton';
import { LoginSocialButton } from '../../components/Authentication/LoginSocialButton';
import { NewInput } from '../../components/NewInput';

import GoogleIcon from '../../assets/images/Icons/google_icon.svg'
import FacebookIcon from '../../assets/images/Icons/facebook_icon.svg';
import UserIcon from '../../assets/images/Icons/signIn-user.svg';
import KeyIcon from '../../assets/images/Icons/signIn-password.svg';

const SignIn = () => {
  const { signIn, user } = useAuth()
  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('') //jorgeoreidafloresta@gmail.com'
  const [password, setPassword] = useState<string>('') // '123456'
  const [errored, setErrored] = useState<boolean>(false)
  const [secure, setSecure] = useState(true);
  const handleLogin = useCallback(async () => {
    try {
      console.log({ email, password })
      await signIn({ email, password })
      setErrored(false)
    } catch (error: any) {
      console.log('Error catched! 🧤')
      setErrored(true)
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Email/Username ou senha incorretos',
        text2: '',
        visibilityTime: 1000,
        bottomOffset: 100,
      })
    }
  }, [email, password])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header />

          <ScrollContainer>
            <SignInOptions >

              <InputContainer isErrored={errored}>
                <NewInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  icon={UserIcon}
                  keyboardType="email-address"
                  placeholder="Email/Username"
                  placeholderTextColor="rgba(0,0,0,0.6)"
                  defaultValue={email}
                  onChangeText={(email: string) => setEmail(email)}
                />

                <SpacingLine isErrored={errored} />

                <NewInput
                  icon={KeyIcon}
                  passwordStyleInput
                  placeholder="Senha"
                  placeholderTextColor="rgba(0,0,0,0.6)"
                  secure={secure}
                  secureTextEntry={secure}
                  setSecure={setSecure}
                  defaultValue={password}
                  onChangeText={(password: string) => setPassword(password)}
                />
              </InputContainer>


              <RegisterAndPassowordForgotContainer>
                <HelpButtonContainer
                  onPress={() => {
                    setErrored(false)
                    navigation.navigate('Register')
                  }}
                >
                  <HelpButtonText>Cadastre-se</HelpButtonText>
                </HelpButtonContainer>

                <HelpButtonContainer>
                  <HelpButtonText>Esqueceu a senha?</HelpButtonText>
                </HelpButtonContainer>
              </RegisterAndPassowordForgotContainer>

              <SubmitButton
                onPress={() => handleLogin()}
                text='Entrar'
              />

              <SpacingContainer>
                <SpacingLine style={{ width: '40%' }}></SpacingLine>
                <SpacingText>Ou</SpacingText>
                <SpacingLine style={{ width: '40%' }}></SpacingLine>
              </SpacingContainer>

              <LoginButtonContainer>
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

              </LoginButtonContainer>

              <HelpContainer>
                <HelpContainerTexts
                  style={{ marginRight: RFValue(2) }}
                >Algum problema no login?
                </HelpContainerTexts>

                <HelpButtonContainer>
                  <HelpButtonText>Contate-nos</HelpButtonText>
                </HelpButtonContainer>
              </HelpContainer>

            </SignInOptions>
            <FooterAuthentication />
          </ScrollContainer>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SignIn;