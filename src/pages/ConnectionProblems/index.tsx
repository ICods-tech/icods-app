import React from "react";
import { ButtonContainer, Container, Message, Title } from './styles';
import WiFiImage from '../../assets/images/Icons/eva_wifi-off-fill.svg';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import { SubmitButton } from "../../components/SubmitButton";
import Header from "../../components/Header";

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
      <Header 
        title=""
        navigate="Início"
      />
      <WiFiImage />
      <Title>Sem conexão</Title>
      <Message>Sua conexão com internet está atualmente indisponível, por favor verifique ou tente novamente </Message>
      <ButtonContainer>
        <SubmitButton 
          enabled={true}
          onPress={handleButton}
          text="Tentar novamente"
        />
      </ButtonContainer>
    </Container>
  );
}

export default ConnectionProblems;