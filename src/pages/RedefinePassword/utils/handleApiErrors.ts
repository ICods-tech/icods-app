import { displayToast } from "../../../utils/Toast";

interface ICheckApiError {
  error: any;
  setIsPasswordErrored?: (value: boolean) => void;
  setConfirmationCodeError?: (value: boolean) => void;
}

interface IHandlerApiError {
  error: any;
  setIsPasswordErrored: (value: boolean) => void;
  setConfirmationCodeError: (value: boolean) => void;
}

export const checkPasswordError = ({ error, setIsPasswordErrored }: ICheckApiError) => {
  if ('errors' in error?.response.data) {
    const passwordsMustBeEqualError = error.response.data.errors.some(
      ({ msg }: { msg: string }) => {
        return msg === 'Senhas devem ser iguais';
      },
    );

    if (passwordsMustBeEqualError) setIsPasswordErrored!(true);
    else setIsPasswordErrored!(false);
  } else setIsPasswordErrored!(false);
};

export const checkVerificationCodeError = ({ error, setConfirmationCodeError }: ICheckApiError) => {
  const errorData = error?.response.data;
  if (
    typeof errorData === 'string' &&
    errorData.includes('Senha temporária ou email inválido!')
  ) {
    setConfirmationCodeError!(true);
  } else {
    setConfirmationCodeError!(false);
  }
};

export const handleApiError = ({
  error,
  setIsPasswordErrored,
  setConfirmationCodeError
}: IHandlerApiError) => {
  const errorData = error?.response.data;
  checkVerificationCodeError({ error, setConfirmationCodeError });
  typeof errorData !== 'string' && checkPasswordError({ error, setIsPasswordErrored });
  displayToast({
    message1:
      typeof errorData === 'string' ? errorData : errorData.errors[0].msg,
    type: 'error',
    duration: 1000,
  });
}