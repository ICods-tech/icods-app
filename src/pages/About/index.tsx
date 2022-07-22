import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {InfoSquare, Lock, Paper} from 'react-native-iconly';
import {AboutButton} from '../../components/AboutButton';
import Header from '../../components/Header';
import handleLinkNavigation from '../../utils/handleLinkNavigation';
import {
  AboutButtonContainer,
  CategoriesHeader,
  CategoriesInnerContainer,
  CategoriesTextTitle,
  Container,
} from './styles';

const About = () => {
  const navigation = useNavigation<any>();

  return (
    <Container>
      <SafeAreaView style={{backgroundColor: '#2b90d9'}} />
      <StatusBar backgroundColor="#3097db" barStyle="light-content" />
      <Header navigate="back" title="Sobre" />
      <CategoriesHeader>
        <CategoriesTextTitle>Categorias</CategoriesTextTitle>
      </CategoriesHeader>
      <CategoriesInnerContainer>
        <AboutButtonContainer>
          <AboutButton
            title="Política de privacidade"
            icon={Lock}
            onPress={() =>
              handleLinkNavigation('https://www.icods.com.br/politcs')
            }
          />
        </AboutButtonContainer>

        <AboutButtonContainer>
          <AboutButton
            title="Termos de uso"
            icon={Paper}
            onPress={() =>
              handleLinkNavigation('https://www.icods.com.br/terms')
            }
          />
        </AboutButtonContainer>

        <AboutButtonContainer>
          <AboutButton
            title="Versão do aplicativo"
            icon={InfoSquare}
            onPress={() => navigation.navigate('Version')}
          />
        </AboutButtonContainer>
      </CategoriesInnerContainer>
    </Container>
  );
};

export default About;
