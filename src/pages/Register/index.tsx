import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard, SafeAreaView, TextInput, TouchableWithoutFeedback
} from 'react-native';
import { Message, Password, User } from 'react-native-iconly';
import { Header } from '../../components/Authentication/Header';
import { BackButton } from '../../components/BackButton';
import { SubmitButton } from '../../components/SubmitButton';
import { LOG } from '../../config';
import { useAuth } from '../../hooks/auth';
import { delay } from '../../utils/delay';
import { handleFieldAlreadyExistsErrors } from '../../utils/handleFieldAlreadyExistsErrors';
import { handleRegisterRouteErrors } from '../../utils/handleRegisterRouteErrors';
import {
  BackButtonContainer,
  Container,
  Form,
  InputContainer,
  RegisterTitle,
  ScrollRegister,
  SubmitButtonContainer,
  UseTermsButtonText,
  UseTermsChecked, UseTermsConfirmedButton,
  UseTermsContainer,
  UseTermsShowButton, UseTermsText
} from './styles';

import analytics from '@react-native-firebase/analytics';
import UserNameSvg from '../../assets/images/Icons/user_name.svg';
import Input from '../../components/Input';
import ModalUseTerms from '../../components/ModalUseTerms';
import PasswordInput from '../../components/PasswordInput';
import { displayToast } from '../../utils/Toast';
const log = LOG.extend('Register');

export interface IRouteErrors {
  name: boolean;
  email: boolean;
  username: boolean;
  password: boolean;
  passwordConfirmation: boolean;
}

const fields = {
  name: '',
  email: '',
  username: '',
  password: '',
  passwordConfirmation: '',
};

const Register = () => {
  const { signIn, signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isErrored, setIsErrored] = useState<IRouteErrors>({
    name: false,
    email: false,
    username: false,
    password: false,
    passwordConfirmation: false,
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [useTermsPressed, setUseTermsPressed] = useState(false);
  const [useTerms, setUseTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const userNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);



  function handleResetIsErrored() {
    setIsErrored({
      name: false,
      email: false,
      username: false,
      password: false,
      passwordConfirmation: false,
    });
  }

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);
    const data = {
      name,
      username,
      email,
      password,
      passwordConfirmation,
    };

    try {
      for (let field of Object.keys(fields)) {
        setIsErrored((previousErrors) => ({
          ...previousErrors,
          [field]: false,
        }));
      }

      await signUp({ name, username, email, password, passwordConfirmation });

      await analytics().logSignUp({
        method: 'api',
      });
      setUseTerms(false);
      displayToast({
        message1: 'Conta criada com sucesso!',
        type: 'success',
        duration: 1200
      })
      await delay(1250);
      await signIn({ email, password });
    } catch (errorResponse: any) {
      setUseTerms(false);
      const errors = errorResponse.response.data;
      log.error(errors);
      if ('message' in errors)
        await handleRegisterRouteErrors(errors, setIsErrored);
      else await handleFieldAlreadyExistsErrors(errors, setIsErrored);
      setIsLoading(false);
    }
  }, [name, username, email, password, passwordConfirmation, useTerms]);

  const navigation = useNavigation<any>();
  const handleBackButton = () => {
    navigation.navigate('SignIn');
  }

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
  }, [Keyboard, useTerms]);

  const handleUseTerms = () => {
    setUseTerms(!useTerms);
  };

  const handleKeyboardDosentVisible = () => {
    Keyboard.dismiss();
    setIsKeyboardVisible(false);
  };

  const handleUseTermsPressed = () => {
    setUseTermsPressed(!useTermsPressed);
  };

  const handleUseTermsModalConfirmed = () => {
    setUseTerms(true);
    setUseTermsPressed(false);
  };

  const handleUseTermsModalCancel = () => {
    setUseTerms(false);
    setUseTermsPressed(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleKeyboardDosentVisible}>
        <Container>
          <Header isKeyboardVisible={isKeyboardVisible} />

          <BackButtonContainer isKeyboardVisible={isKeyboardVisible}>
            <BackButton
              navigationTo="WAIT"
              customFunction={handleBackButton}
              color={isKeyboardVisible ? 'blue' : 'white'}
            />
          </BackButtonContainer>

          <ScrollRegister keyboardShouldPersistTaps="handled">
            <Form>
              <RegisterTitle>
                Fazer uma conta no iCods é simples e rápido, basta preencher os
                campos!
              </RegisterTitle>

              <InputContainer>
                <Input
                  autoCorrect
                  autoCapitalize="words"
                  defaultValue={name}
                  iconSvg={UserNameSvg}
                  isErrored={isErrored.name}
                  isSignUpErrored={{
                    ...isErrored,
                    name: false,
                  }}
                  placeholder="Nome completo"
                  onChangeText={setName}
                  onSubmitEditing={() => userNameInputRef.current?.focus()}
                  setIsSignUpErrored={setIsErrored}
                  returnKeyType="next"
                  value={name}
                />

                <Input
                  ref={userNameInputRef}
                  autoCorrect
                  autoCapitalize="none"
                  defaultValue={username}
                  iconly={User}
                  isErrored={isErrored.username}
                  isSignUpErrored={{
                    ...isErrored,
                    username: false,
                  }}
                  placeholder="Nome de usuário"
                  onChangeText={setUsername}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  setIsSignUpErrored={setIsErrored}
                  value={username}
                  returnKeyType="next"
                />

                <Input
                  ref={emailInputRef}
                  autoCorrect={false}
                  autoCapitalize="none"
                  defaultValue={email}
                  iconly={Message}
                  isErrored={isErrored.email}
                  isSignUpErrored={{
                    ...isErrored,
                    email: false,
                  }}
                  placeholder="E-mail"
                  onChangeText={setEmail}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  setIsSignUpErrored={setIsErrored}
                  value={email}
                  returnKeyType="next"
                />

                <PasswordInput
                  ref={passwordInputRef}
                  iconly={Password}
                  isErrored={isErrored.password}
                  isSignUpErrored={{
                    ...isErrored,
                    password: false,
                  }}
                  placeholder="Senha"
                  defaultValue={password}
                  onChangeText={setPassword}
                  onSubmitEditing={() =>
                    passwordConfirmationInputRef.current?.focus()
                  }
                  setIsSignUpErrored={setIsErrored}
                  value={password}
                  returnKeyType="next"
                />

                <PasswordInput
                  ref={passwordConfirmationInputRef}
                  iconly={Password}
                  isErrored={isErrored.passwordConfirmation}
                  isSignUpErrored={{
                    ...isErrored,
                    passwordConfirmation: false,
                  }}
                  placeholder="Confirmar senha"
                  defaultValue={passwordConfirmation}
                  onChangeText={setPasswordConfirmation}
                  onSubmitEditing={handleKeyboardDosentVisible}
                  setIsSignUpErrored={setIsErrored}
                  value={passwordConfirmation}
                  returnKeyType="next"
                />
              </InputContainer>

              <UseTermsContainer>
                <UseTermsConfirmedButton onPress={handleUseTerms}>
                  <UseTermsChecked useTermsPressed={useTerms} />
                  <UseTermsText>Li e estou de acordo com os</UseTermsText>
                </UseTermsConfirmedButton>

                <UseTermsShowButton onPress={handleUseTermsPressed}>
                  <UseTermsButtonText>Termos de Uso</UseTermsButtonText>
                </UseTermsShowButton>
              </UseTermsContainer>

              <SubmitButtonContainer>
                <SubmitButton
                  enabled={
                    !!name &&
                    !!username &&
                    !!email &&
                    !!password &&
                    !!passwordConfirmation &&
                    useTerms &&
                    !isLoading
                  }
                  loading={isLoading}
                  onPress={() => {
                    handleSignUp(), handleResetIsErrored();
                  }}
                  text="Cadastrar"
                />
              </SubmitButtonContainer>
            </Form>
          </ScrollRegister>
        </Container>
      </TouchableWithoutFeedback>
      <ModalUseTerms
        handleUseTermsModalConfirmed={() => handleUseTermsModalConfirmed()}
        handleUseTermsModalCancel={() => handleUseTermsModalCancel()}
        visible={useTermsPressed}
      />
    </SafeAreaView>
  );
};

export default Register;
