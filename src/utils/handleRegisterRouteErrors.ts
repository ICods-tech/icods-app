import { Dispatch, SetStateAction } from 'react';
import { IRouteErrors } from '../pages/Register';
import { delay } from './delay';
import { displayToast } from './Toast';

interface IErrorsResponse {
  message: {
    errors: {
      value: string,
      msg: string,
      param: string,
      location: Body
    }[]
  }
}

const fieldTypes = {
  "name": "Nome",
  "username": "Username",
  "email": "Email",
  "password": "Senha",
  "passwordConfirmation": "Confirmar senha"
}

type fields = 'name' | 'username' | 'email' | 'password' | 'passwordConfirmation'

export async function handleRegisterRouteErrors(
  errors: IErrorsResponse,
  setErrorState: Dispatch<SetStateAction<IRouteErrors>>
) {
  const errorsData = errors.message.errors

  for (let { param } of errorsData) {
    setErrorState((previousErrors) => ({
      ...previousErrors,
      [param]: true
    }))
  }

  for (let { param, msg } of errorsData) {
    displayToast({
      message1: fieldTypes[param as fields],
      message2: msg,
      type: 'error',
    })
    await delay(2000)
  }
}