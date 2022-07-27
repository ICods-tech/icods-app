import React from "react";
import { Button, ButtonText, Container, Message, Title } from './styles';
import WiFiImage from '../../assets/images/Icons/eva_wifi-off-fill.svg';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

const ConnectionProblems = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleButton = () => {
    if (user) {
      navigation.navigate('TabBarRoutes');
    }
    else {
      navigation.navigate('SignIn');
    }
  }

  return (
    <Container>
      <WiFiImage />
      <Title>Sem conexão</Title>
      <Message>Sua conexão com internet está atualmente indisponível, por favor verifique ou tente novamente </Message>
      <Button onPress={handleButton}>
        <ButtonText>Tentar Novamente</ButtonText>
      </Button>
    </Container>
  );
}

export default ConnectionProblems;