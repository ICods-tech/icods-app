import React from 'react';
import { Container, Gift, GiftContainer, GiftOpenButtonContainer, GiftOpenSubtitle, GiftOpenTitle } from './styles';
import { useNavigation } from '@react-navigation/native';
import { SubmitButton } from '../../components/SubmitButton';

const GiftOpen = () =>
{
  const navigation = useNavigation();
  return (
    <Container>
      <GiftContainer>
        <Gift />
      </GiftContainer>
      <GiftOpenTitle>
        Presente aberto!
      </GiftOpenTitle>
      <GiftOpenSubtitle>
        Para curtir é necessário fazer login.
        Crie uma conta iCods, é fácil e rápido!
      </GiftOpenSubtitle>
      <GiftOpenButtonContainer>
        <SubmitButton
          enabled={true}
          onPress={() => navigation.navigate('Register')}
          text="Criar conta iCods"
        />
      </GiftOpenButtonContainer>
    </Container>
  );
}

export default GiftOpen;
