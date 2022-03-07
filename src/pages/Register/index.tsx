import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  BackButtonContainer,
  Form,
  InputContainer,
  RegisterTitle,
  ScrollRegister,
  SubmitButtonContainer,
} from './styles';
import {useAuth} from '../../hooks/auth';
import Toast from 'react-native-toast-message';
import {delay} from '../../utils/delay';
import {handleRegisterRouteErrors} from '../../utils/handleRegisterRouteErrors';
import {handleFieldAlreadyExistsErrors} from '../../utils/handleFieldAlreadyExistsErrors';
import {Header} from '../../components/Authentication/Header';
import {BackButton} from '../../components/BackButton';
import NewInput from '../../components/NewInput';
import {SpacingLine} from '../SignIn/styles';
import {useTheme} from 'styled-components';
import {SubmitButton} from '../../components/Authentication/SubmitButton';
import ModalUseTerms from '../../components/ModalUseTerms';
import analytics from '@react-native-firebase/analytics';
import {LOG} from '../../config';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
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
  const theme = useTheme();
  const {signIn, signUp} = useAuth();
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

  const [secure, setSecure] = useState(true);
  const [secureConfirmation, setSecureConfirmation] = useState(true);
  const [useTerms, setUseTerms] = useState(false);

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

      await signUp({name, username, email, password, passwordConfirmation});

      await analytics().logSignUp({
        method: 'api',
      });
      setUseTerms(false);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Conta criada com sucesso!',
        visibilityTime: 1200,
        bottomOffset: 100,
      });
      await delay(1250);
      await signIn({email, password});
    } catch (errorResponse: any) {
      setUseTerms(false);
      const errors = errorResponse.response.data;
      log.error(errors);
      if ('message' in errors)
        await handleRegisterRouteErrors(errors, setIsErrored);
      else await handleFieldAlreadyExistsErrors(errors, setIsErrored);
    }
  }, [name, username, email, password, passwordConfirmation, useTerms]);

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

  const handleRegister = () => {
    setUseTerms(true);
  };

  const handleCancel = () => {
    setUseTerms(false);
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          isKeyboardVisible ? theme.colors.primary : 'transparent'
        }
        translucent={isKeyboardVisible ? false : true}
      />

      <ScrollRegister keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Header isKeyboardVisible={isKeyboardVisible} />

            <BackButtonContainer isKeyboardVisible={isKeyboardVisible}>
              <BackButton
                isKeyboardVisible={isKeyboardVisible}
                navigationTo="SignIn"
                color="white"
              />
            </BackButtonContainer>

            <Form isKeyboardVisible={isKeyboardVisible}>
              <RegisterTitle>
                Fazer uma conta no iCODS é simples e rápido, basta preencher os
                campos!
              </RegisterTitle>

              <InputContainer>
                <NewInput
                  autoCorrect
                  autoCapitalize="words"
                  defaultValue={name}
                  isErrored={isErrored.name}
                  placeholder="Digite seu nome completo"
                  onChangeText={(name: string) => setName(name)}
                  onFocus={() =>
                    setIsErrored((isErrored) => ({
                      ...isErrored,
                      name: false,
                    }))
                  }
                  onSubmitEditing={() => userNameInputRef.current?.focus()}
                  value={name}
                  returnKeyType="next"
                />

                <NewInput
                  ref={userNameInputRef}
                  autoCorrect
                  autoCapitalize="none"
                  defaultValue={username}
                  isErrored={isErrored.username}
                  placeholder="Digite seu nome de usuário"
                  onChangeText={(username: string) => setUsername(username)}
                  onFocus={() =>
                    setIsErrored((isErrored) => ({
                      ...isErrored,
                      username: false,
                    }))
                  }
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  value={username}
                  returnKeyType="next"
                />

                <NewInput
                  ref={emailInputRef}
                  autoCorrect={false}
                  autoCapitalize="none"
                  defaultValue={email}
                  isErrored={isErrored.email}
                  placeholder="Digite seu e-mail"
                  onChangeText={(email: string) => setEmail(email)}
                  onFocus={() =>
                    setIsErrored((isErrored) => ({
                      ...isErrored,
                      email: false,
                    }))
                  }
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  value={email}
                  returnKeyType="next"
                />

                <NewInput
                  isErrored={isErrored.password}
                  ref={passwordInputRef}
                  passwordStyleInput
                  placeholder="Digite uma senha"
                  secure={secure}
                  secureTextEntry={secure}
                  setSecure={setSecure}
                  defaultValue={password}
                  onChangeText={(password: string) => setPassword(password)}
                  onFocus={() =>
                    setIsErrored((isErrored) => ({
                      ...isErrored,
                      password: false,
                    }))
                  }
                  onSubmitEditing={() =>
                    passwordConfirmationInputRef.current?.focus()
                  }
                  value={password}
                  returnKeyType="next"
                />

                <NewInput
                  isErrored={isErrored.passwordConfirmation}
                  ref={passwordConfirmationInputRef}
                  passwordStyleInput
                  placeholder="Digite novamente a senha"
                  secure={secureConfirmation}
                  secureTextEntry={secureConfirmation}
                  setSecure={setSecureConfirmation}
                  defaultValue={passwordConfirmation}
                  onChangeText={(passwordConfirmation: string) =>
                    setPasswordConfirmation(passwordConfirmation)
                  }
                  onFocus={() =>
                    setIsErrored((isErrored) => ({
                      ...isErrored,
                      passwordConfirmation: false,
                    }))
                  }
                  onSubmitEditing={() => handleSignUp()}
                  value={passwordConfirmation}
                  returnKeyType="send"
                />
              </InputContainer>

              <SubmitButtonContainer>
                <SubmitButton
                  onPress={() => {
                    handleRegister(), handleResetIsErrored();
                  }}
                  text="Cadastrar"
                />
              </SubmitButtonContainer>
            </Form>
          </View>
        </TouchableWithoutFeedback>
        {useTerms && (
          <ModalUseTerms
            handleSignUp={() => handleSignUp()}
            handleCancel={() => handleCancel()}
          />
        )}
      </ScrollRegister>
    </SafeAreaView>
  );
};

export default Register;
