import { Dispatch, SetStateAction } from 'react';
import { IRouteErrors } from '../pages/Register';
import { capitalizeWords } from './capitalizeWords';
import { delay } from './delay';
import { displayToast } from './Toast';

interface FieldExistsErrors {
  message: string
  statusCode: number
}

const fieldAlreadyExistsErrors = {
  "Usuário com esse Email já existe": 'email',
  "Usuário com esse Username já existe": 'username'
}

type fieldExistsMessages = "Usuário com esse Username já existe" | "Usuário com esse Username já existe"


export async function handleFieldAlreadyExistsErrors(
  errors: FieldExistsErrors[],
  setErrorState: Dispatch<SetStateAction<IRouteErrors>>
) {

  for (let { message } of errors) {
    setErrorState((previousErrors) => ({
      ...previousErrors,
      [fieldAlreadyExistsErrors[message as fieldExistsMessages]]: true,
    }))
  }

  for (let { message } of errors) {
    displayToast({
      message1: capitalizeWords(fieldAlreadyExistsErrors[message as fieldExistsMessages]),
      message2: message,
      type: 'error',
    })
    await delay(2000)
  }
}