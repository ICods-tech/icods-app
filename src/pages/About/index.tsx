import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import { 
  ActivitiesContainer, 
  CategoriesText,
  CategoriesHeader,
  CategoriesOuterContainer,
  CategoryContainer,
  Container,
  RightArrowIcon,
  CategoriesInnerContainer,
} from './styles';
import { Lock, Paper, InfoSquare } from 'react-native-iconly'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const About = () => {
  const navigation = useNavigation();
  const iconColor = 'rgba(0, 0, 0, 0.87)'
  const iconMargin = { marginRight: RFValue(18) }

  const categoriesData = [
    { name: 'Política de dados', icon: <Lock style={iconMargin} color={iconColor} />, page: null },
    { name: 'Termos de uso', icon: <Paper  style={iconMargin}  color={iconColor} />, page: null },
    { name: 'Versão do aplicativo', icon: <InfoSquare style={iconMargin}  color={iconColor} />, page: 'Version' }
  ]

  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#2b90d9' }} />
      <StatusBar
        backgroundColor="#3097db"
        barStyle="light-content"
      />
      <Header
        navigate='back'
        page='Sobre'
      />
      <CategoriesOuterContainer>
        <CategoriesHeader>
          <CategoriesText>Categorias</CategoriesText>
        </CategoriesHeader>
        <CategoriesInnerContainer>
          {categoriesData.map((category, index) => (
            <CategoryContainer onPress={() => {
              return category.page && navigation.navigate('Version')
            }}>
              { category.icon }
              <CategoriesText>{category.name}</CategoriesText>
              <RightArrowIcon />
            </CategoryContainer>
          ))}
        </CategoriesInnerContainer>
      </CategoriesOuterContainer>
    </Container>
  )
}

export default About;