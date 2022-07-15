import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform, TextInput,
  TextInputChangeEventData
} from 'react-native';
import { useTheme } from 'styled-components/native';

import email from 'react-native-email';
import Toast from 'react-native-toast-message';
import { SubmitButton } from '../../components/Authentication/SubmitButton';
import Header from '../../components/Header';
import {
  BodyMessage,
  CloudContainer,
  CloudRightSmall,
  Container,
  ContainerBodyMessage,
  ContainerButton, InputContainer
} from './styles';

const Support = () => {
  const theme = useTheme();

  const [supportMessage, setSupportMessage] = useState<string>('');

  const handleEmail = useCallback(() => {
    if (Platform.OS !== 'ios') {
      const emailTo = 'contato@icods.com.br';
      email(emailTo, {
        subject: 'Mensagem de suporte de usuário iCods',
        body: supportMessage,
      }).catch(console.error);
    }
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Mensagem enviada com sucesso',
      visibilityTime: 1200,
      bottomOffset: 100,
    });
  }, [supportMessage]);

  const navigation = useNavigation<any>();

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
        <TextInput
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
