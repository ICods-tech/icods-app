import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Keyboard, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { Password } from 'react-native-iconly';
import Toast from 'react-native-toast-message';
import { Header } from '../../components/Authentication/Header';
import { BackButton } from '../../components/BackButton';
import PasswordInput from '../../components/PasswordInput';
import { SubmitButton } from '../../components/SubmitButton';
import { LOG } from '../../config';
import theme from '../../global/styles/theme';
import api from '../../services/api';
import { checkConnection } from '../../utils/checkConnection';
import { encryptEmail } from '../../utils/encryptEmail';
import {
  BackButtonContainer,
  Cell,
  Container,
  ContainerButton,
  EmailText,
  FieldsRow,
  InputContainer,
  RedefinePasswordForm,
  RedefinePasswordFormLabel,
  RedefinePasswordFormSendButton,
  RedefinePasswordFormSendButtonContainer,
  RedefinePasswordFormSendButtonLabel,
  SafeAreaView,
  SpacingLine
} from './styles';
const log = LOG.extend('RedefinePassword');

const RedefinePassword = ({ route, _ }: any) => {
  const { email, pass } = route.params;

  const CELL_COUNT = 6;
  const navigation = useNavigation<any>();
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const [password, setpassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [inputFocusObserver, setInputFocusObserver] = useState(false);
  const [isPasswordErrored, setIsPasswordErrored] = useState(false);
  const [confirmationCodeError, setConfirmationCodeError] = useState(false);
  const [value, setValue] = useState(pass);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [success, setSuccess] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const displayToast = ({ text1, type }: { text1: string; type: string }) => {
    return Toast.show({
      type,
      position: 'bottom',
      text1,
      text2: '',
      visibilityTime: 1000,
      bottomOffset: 100,
    });
  };

  interface IRenderCell {
    index: number;
    symbol: string;
    isFocused: boolean;
  }

  const renderCell = ({ index, symbol, isFocused }: IRenderCell) => {
    let textChild = null;

    if (symbol) {
      textChild = symbol;
    } else if (isFocused) {
      setConfirmationCodeError(false);
      textChild = <Cursor />;
    }

    return (
      <Cell
        key={index}
        focused={isFocused}
        isCorrect={success}
        errored={confirmationCodeError}
        editable={pass ? false : true}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Cell>
    );
  };

  const checkPasswordErrored = (error: any) => {
    if ('errors' in error?.response.data) {
      const passwordsMustBeEqualError = error.response.data.errors.some(
        ({ msg }: { msg: string }) => {
          return msg === 'Senhas devem ser iguais';
        },
      );

      if (passwordsMustBeEqualError) setIsPasswordErrored(true);
      else setIsPasswordErrored(false);
    } else setIsPasswordErrored(false);
  };

  const checkVerificationCodeError = (error: any) => {
    const errorData = error?.response.data;
    if (
      typeof errorData === 'string' &&
      errorData.includes('Senha temporária ou email inválido!')
    ) {
      setConfirmationCodeError(true);
    } else {
      setConfirmationCodeError(false);
    }
  };

  const handleRedefinePassword = useCallback(async () => {
    try {
      const tempPassword = pass || value
      if (!tempPassword || tempPassword.length < 6) {
        displayToast({
          text1: 'Código inválido',
          type: 'error',
        });
        setConfirmationCodeError(true);
        return;
      }
      if (!password.length || !passwordConfirmation.length) {
        displayToast({
          text1: 'Para prosseguir, complete os campos',
          type: 'error',
        });
        setIsPasswordErrored(true);
        return;
      }
      if (password !== passwordConfirmation) {
        displayToast({
          text1: 'Senhas devem ser iguais',
          type: 'error',
        });
        setIsPasswordErrored(true);
        return;
      }

      const connection = await checkConnection();
      if (!connection) {
        navigation.navigate('ConnectionProblems' as any);
        return;
      }
      await api.patch('resetPasswordTempPass', {
        email,
        tempPassword,
        newPassword: password,
        passwordConfirmation,
      });

      displayToast({
        text1: 'Sua senha foi alterada com sucesso',
        type: 'success',
      });
      navigation.navigate('SignIn');
    } catch (error: any) {
      const errorData = error?.response.data;
      console.log('erro do catch', errorData);
      checkVerificationCodeError(error);
      typeof errorData !== 'string' && checkPasswordErrored(error);
      displayToast({
        text1:
          typeof errorData === 'string' ? errorData : errorData.errors[0].msg,
        type: 'error',
      });
      log.error(error);
    }
  }, [email, pass, value, password, passwordConfirmation]);

  const filledInput = () => {
    return password.length > 0 || passwordConfirmation.length > 0
  }

  const handleBackButton = () => {
    navigation.navigate('SignIn');
  };


  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isKeyboardVisible={isInputFocus} />
          <BackButtonContainer>
            <BackButton
              navigationTo="WAIT"
              customFunction={handleBackButton}
              color="white"
            />
          </BackButtonContainer>

          <RedefinePasswordForm>
            <RedefinePasswordFormLabel>
              Copie e cole aqui a senha temporária que enviamos para {'\n'}
              <EmailText>{encryptEmail(email)}</EmailText>.

            </RedefinePasswordFormLabel>
            <FieldsRow>
              <CodeField
                ref={ref}
                {...props}
                value={pass ? pass : value}
                editable={pass ? false : true}
                onChangeText={(text: string) => {
                  setValue(text);
                  success === true && setSuccess(false);
                }}
                cellCount={CELL_COUNT}
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
            </FieldsRow>

            <RedefinePasswordFormLabel>
              Agora é só completar os dados a seguir:
            </RedefinePasswordFormLabel>

            <InputContainer isErrored={isPasswordErrored}>
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
                isErrored={isPasswordErrored}
                setIsSignInErrored={setIsPasswordErrored}
              />

              <SpacingLine isErrored={isPasswordErrored} />

              <PasswordInput
                ref={passwordConfirmationInputRef}
                iconly={Password}
                placeholder="Confirmar nova senha"
                placeholderTextColor={theme.colors.subtitle}
                defaultValue={passwordConfirmation}
                value={passwordConfirmation}
                onChangeText={(passwordConfirmation: string) =>
                  setPasswordConfirmation(passwordConfirmation)
                }
                onSubmitEditing={handleRedefinePassword}
                returnKeyType="send"
                isErrored={isPasswordErrored}
                setIsSignInErrored={setIsPasswordErrored}
              />
            </InputContainer>
            <ContainerButton>
              <SubmitButton
                enabled={filledInput()}
                onPress={handleRedefinePassword}
                text={'Alterar senha'}
              />
            </ContainerButton>
          </RedefinePasswordForm>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RedefinePassword;
