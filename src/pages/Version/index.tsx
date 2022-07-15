import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import jsonPackage from '../../../package.json';
import Logo from '../../assets/images/iCods_logo.svg';
import Header from '../../components/Header';
import { Container, FooterContainer, FooterText } from './styles';

const Version = () => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#3097db', '#53C4E8']}
      style={{ paddingHorizontal: 15 }}
    >
      <Header
        title='Versão do Aplicativo'
        navigate="back"
        whiteMode={true}
      />
      <Container>
        <Logo />
        <FooterContainer>
          <FooterText>iCods App</FooterText>
          <FooterText>Versão {jsonPackage.version}</FooterText>
        </FooterContainer>
      </Container>
    </LinearGradient>
  )
}

export default Version;