import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import {
  CodeField,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Password } from 'react-native-iconly';
import { Header } from '../../components/Authentication/Header';
import { BackButton } from '../../components/BackButton';
import PasswordInput from '../../components/PasswordInput';
import { SubmitButton } from '../../components/SubmitButton';
import { LOG } from '../../config';
import theme from '../../global/styles/theme';
import api from '../../services/api';
import { checkConnection } from '../../utils/checkConnection';
import { encryptEmail } from '../../utils/encryptEmail';
import { displayToast } from '../../utils/Toast';
import { errorsBoilerplate, handleError } from './utils/handleInputErrors'
import {
  BackButtonContainer,
  Container,
  ContainerButton,
  EmailText,
  FieldsRow,
  InputContainer,
  RedefinePasswordForm,
  RedefinePasswordFormLabel,
  SafeAreaView,
  SpacingLine,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { handleApiError } from './utils/handleApiErrors';
import { VerificationCodeInput } from '../../components/molecules/VerificationCodeInput';
const log = LOG.extend('RedefinePassword');

const RedefinePassword = ({ route }: any) => {
  const { user, signOut } = useAuth();
  const { email, pass } = route.params;
  const CELL_COUNT = 6;
  const navigation = useNavigation<any>();
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const [password, setpassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isPasswordErrored, setIsPasswordErrored] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [confirmationCodeError, setConfirmationCodeError] = useState(false);
  const [value, setValue] = useState(pass);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [success, setSuccess] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleUserLogout = useCallback(async () => {
    if (!user) await signOut();
  }, [user, signOut]);

  useEffect(() => {
    handleUserLogout()
  }, [handleUserLogout])


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', () => { setIsKeyboardVisible(true); },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', () => { setIsKeyboardVisible(false); },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [Keyboard]);

  const handleRedefinePassword = useCallback(async () => {
    try {
      const tempPassword = pass || value

      const { hasErrors, possibleErrors, possibleErrorMessages } = errorsBoilerplate({ tempPassword, password, passwordConfirmation })

      if (hasErrors) return handleError({ possibleErrors, possibleErrorMessages, setIsPasswordErrored, setConfirmationCodeError })

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

      displayToast({ message1: 'Sua senha foi alterada com sucesso', type: 'success', duration: 1000 });
      navigation.navigate('SignIn');
    } catch (error: any) {
      handleApiError({ error, setConfirmationCodeError, setIsPasswordErrored });
      log.error(error);
    }
  }, [email, pass, value, password, passwordConfirmation]);

  const filledInput = () => {
    return password.length > 0 || passwordConfirmation.length > 0;
  };

  const handleBackButton = () => {
    navigation.navigate('SignIn');
  };


  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header isKeyboardVisible={isKeyboardVisible} />
          <BackButtonContainer isKeyboardVisible={isKeyboardVisible}>
            <BackButton
              navigationTo="WAIT"
              customFunction={handleBackButton}
              color={isKeyboardVisible ? 'blue' : 'white'}
            />
          </BackButtonContainer>
          <RedefinePasswordForm isKeyboardVisible={isKeyboardVisible}>
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
                renderCell={({ symbol, index, isFocused }: RenderCellOptions) =>
                  <VerificationCodeInput
                    key={index}
                    confirmationCodeError={confirmationCodeError}
                    isFocused={isFocused}
                    symbol={symbol}
                    index={index}
                    getCellOnLayoutHandler={getCellOnLayoutHandler}
                    pass={pass}
                    setConfirmationCodeError={setConfirmationCodeError}
                    success={success}
                  />
                }
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
                onChangeText={(passwordChange: string) => setpassword(passwordChange)}
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
                onChangeText={(passwordConfirmationChange: string) =>
                  setPasswordConfirmation(passwordConfirmationChange)
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