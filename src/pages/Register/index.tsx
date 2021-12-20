import React, { 
  useState, 
  useCallback, 
  useRef, 
  useEffect 
} from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  BackButtonContainer,
  Container,
  InputContainer,
  RegisterForm,
  RegisterTitle,
  SafeAreaView,
  SubmitButtonContainer
} from './styles';
import { useAuth } from '../../hooks/auth'
import Toast from 'react-native-toast-message'
import { delay } from '../../utils/delay'
import { handleRegisterRouteErrors } from '../../utils/handleRegisterRouteErrors'
import { handleFieldAlreadyExistsErrors } from '../../utils/handleFieldAlreadyExistsErrors'
import { Header } from '../../components/Authentication/Header'
import { BackButton } from '../../components/BackButton'
import NewInput from '../../components/NewInput'
import { SpacingLine } from '../SignIn/styles'
import { useTheme } from 'styled-components'
import { SubmitButton } from '../../components/Authentication/SubmitButton'

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
  passwordConfirmation: ''
}

const Register = () => {
  const theme = useTheme();
  const { signIn, signUp } = useAuth();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isErrored, setIsErrored] = useState<IRouteErrors>({
    name: false,
    email: false,
    username: false,
    password: false,
    passwordConfirmation: false
  })
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const [attention, setAttention] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [inputFocusObserver, setInputFocusObserver] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureConfirmation, setSecureConfirmation] = useState(true);
  const userNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async () => {
    const data = {
      name, 
      username, 
      email, 
      password, 
      passwordConfirmation
    }
    
    try {
      for (let field of Object.keys(fields)) {
        setIsErrored((previousErrors) => ({
          ...previousErrors,
          [field]: false
        }))
      }

      await signUp({ name, username, email, password, passwordConfirmation })
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Conta criada com sucesso!',
        visibilityTime: 1200,
        bottomOffset: 100,
      })
      await delay(1250)
      await signIn({ email, password })
      setAttention(false);  
    } catch (errorResponse: any) {
      const errors = errorResponse.response.data
      console.log('Não conseguiu cadastras:', data);
      console.log(errors);
      setAttention(true);
      if ('message' in errors) await handleRegisterRouteErrors(errors, setIsErrored)
      else await handleFieldAlreadyExistsErrors(errors, setIsErrored)
    }
  }, [name, username, email, password, passwordConfirmation])
  
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setIsInputFocus(false);
    })  
  }, [inputFocusObserver])
  
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isInputFocus={isInputFocus} />

          <BackButtonContainer>
            <BackButton navigationTo='SignIn' color='white' />
          </BackButtonContainer>

          <RegisterForm>
            <RegisterTitle>
              Fazer uma conta no iCODS é simples e
              rápido, basta preencher os campos!
            </RegisterTitle>
            <InputContainer 
              isErrored={attention}>

                <NewInput
                  autoCorrect
                  autoCapitalize="words"
                  defaultValue={name}
                  placeholder='Digite seu nome completo'
                  placeholderTextColor={theme.colors.subtitle}
                  onChangeText={(name: string) => setName(name)}
                  onFocus={() => {setIsInputFocus(true), setInputFocusObserver(true)}}
                  onSubmitEditing={() => userNameInputRef.current?.focus()}
                  value={name}
                  returnKeyType="next"
                />

                <SpacingLine isErrored={attention}/>

                <NewInput
                  ref={userNameInputRef}
                  autoCorrect
                  autoCapitalize="none"
                  defaultValue={username}
                  placeholder='Nome de usuário'
                  placeholderTextColor={theme.colors.subtitle}
                  onChangeText={(username: string) => setUsername(username)}
                  onFocus={() => {setIsInputFocus(true), setInputFocusObserver(true)}}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  value={username}
                  returnKeyType="next"
                />

                <SpacingLine isErrored={attention}/>

                <NewInput
                  ref={emailInputRef}
                  autoCorrect={false}
                  autoCapitalize="none"
                  defaultValue={email}
                  placeholder='Digite seu e-mail'
                  placeholderTextColor={theme.colors.subtitle}
                  onChangeText={(email: string) => setEmail(email)}
                  onFocus={() => {setIsInputFocus(true), setInputFocusObserver(true)}}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  value={email}
                  returnKeyType="next"
                />

                <SpacingLine isErrored={attention}/>

                <NewInput
                  ref={passwordInputRef}
                  passwordStyleInput
                  placeholder="Digite uma senha"
                  placeholderTextColor={theme.colors.subtitle}
                  secure={secure}
                  secureTextEntry={secure}
                  setSecure={setSecure}
                  defaultValue={password}
                  onChangeText={(password: string) => setPassword(password)}
                  onFocus={() => {setIsInputFocus(true), setInputFocusObserver(true)}}
                  onSubmitEditing={() => passwordConfirmationInputRef.current?.focus()}
                  value={password}
                  returnKeyType="next"
                />

                <SpacingLine isErrored={attention}/>

                <NewInput
                  ref={passwordConfirmationInputRef}
                  passwordStyleInput
                  placeholder="Digite novamente a senha"
                  placeholderTextColor={theme.colors.subtitle}
                  secure={secureConfirmation}
                  secureTextEntry={secureConfirmation}
                  setSecure={setSecureConfirmation}
                  defaultValue={passwordConfirmation}
                  onChangeText={(passwordConfirmation: string) => setPasswordConfirmation(passwordConfirmation)}
                  onFocus={() => {setIsInputFocus(true), setInputFocusObserver(true)}}
                  onSubmitEditing={() => handleSignUp()}
                  value={passwordConfirmation}
                  returnKeyType="send"
                />  
            </InputContainer>

            <SubmitButtonContainer>
              <SubmitButton
                  onPress={() => handleSignUp()}
                  text='Cadastrar'
                />
            </SubmitButtonContainer>
          </RegisterForm>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>

  )
}

export default Register;