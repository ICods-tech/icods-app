import React, { useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform, TextInputChangeEventData
} from 'react-native';
import { useTheme } from 'styled-components/native';

import email from 'react-native-email';
import Header from '../../components/Header';
import { SubmitButton } from '../../components/SubmitButton';
import { displayToast } from '../../utils/Toast';
import {
  BodyMessage,
  CloudContainer,
  CloudRightSmall,
  Container,
  ContainerBodyMessage,
  ContainerButton, Input, InputContainer
} from './styles';

const Support = () => {
  const theme = useTheme();

  const [supportMessage, setSupportMessage] = useState<string>('');

  const handleEmail = useCallback(() => {
    // TODO: Ajeitar o envio do email
    if (Platform.OS !== 'ios') {
      const emailTo = 'contato@icods.com.br';
      email(emailTo, {
        subject: 'Mensagem de suporte de usuário iCods',
        body: supportMessage,
      }).catch(console.error);
    }
    displayToast({
      message1: 'Mensagem enviada com sucesso!',
      type: 'success',
      duration: 1200,
    })
  }, [supportMessage]);

  return (
    <Container>
      <Header title={'Suporte'} navigate="back" />
      <ContainerBodyMessage>
        <CloudContainer>
          <CloudRightSmall />
        </CloudContainer>
        <BodyMessage>
          Escreva sobre o problema ocorrido para que possamos ajuda-lo:
        </BodyMessage>
      </ContainerBodyMessage>
      <InputContainer>
        <Input
          style={{ textAlignVertical: 'top' }}
          placeholder="Mensagem"
          multiline
          value={supportMessage}
          placeholderTextColor={theme.colors.gray_400}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setSupportMessage(e.nativeEvent.text)
          }
        />
      </InputContainer>
      <ContainerButton>
        <SubmitButton
          enabled={!!supportMessage}
          onPress={() => handleEmail()} text={'Enviar'} />
      </ContainerButton>
    </Container>
  );
};

export default Support;
