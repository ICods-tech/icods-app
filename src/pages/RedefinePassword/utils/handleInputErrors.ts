import { displayToast } from "../../../utils/Toast"

interface IErrorsBoilerplate {
  tempPassword: string;
  password: string;
  passwordConfirmation: string;
}

interface IHandlerError {
  possibleErrors: boolean[];
  possibleErrorMessages: string[];
  setIsPasswordErrored: (value: boolean) => void;
  setConfirmationCodeError: (value: boolean) => void;
}

export const errorsBoilerplate = ({ tempPassword, password, passwordConfirmation }: IErrorsBoilerplate) => {
  const codeError = !tempPassword || tempPassword.length < 6

  const passwordNotMatch = password !== passwordConfirmation
  const passwordUnfilled = !password.length || !passwordConfirmation.length

  const possibleErrors = [codeError, passwordUnfilled, passwordNotMatch]
  const possibleErrorMessages = ['Código inválido', 'Para prosseguir, complete os campos', 'Senhas devem ser iguais']

  const hasErrors = possibleErrors.some(Boolean)

  return {
    hasErrors,
    possibleErrors,
    possibleErrorMessages
  }
}

export const handleError = ({
  possibleErrors,
  possibleErrorMessages,
  setConfirmationCodeError,
  setIsPasswordErrored
}: IHandlerError) => {
  const erroredIndex = possibleErrors.findIndex(Boolean)

  displayToast({ message1: possibleErrorMessages[erroredIndex], type: 'error', duration: 1000, });
  erroredIndex === 0 ? setConfirmationCodeError(true) : setIsPasswordErrored(true)
}