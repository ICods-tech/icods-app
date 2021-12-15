import React from 'react';
import { Container, FooterContainer, FooterText, HeaderContainer, HeaderText } from './styles';
import Logo from '../../assets/images/iCods_logo.svg';
import LinearGradient from 'react-native-linear-gradient';
import jsonPackage from '../../../package.json';
import { BackButton } from '../../components/BackButton';

const Version = () => {
  return (
    <>
      <LinearGradient
        start={ { x: 0, y: 0 } }
        end={ { x: 0, y: 1 } }
        colors={ [ '#3097db', '#53C4E8' ] }
        style={ { flex: 1 } }
      >
        <HeaderContainer>
          <BackButton
            color='white'
            navigationTo='/'
          />
          <HeaderText>Versão do Aplicativo</HeaderText>
        </HeaderContainer>
        <Container>
          <Logo />
          <FooterContainer>
            <FooterText>iCods App</FooterText>
            <FooterText>Versão {jsonPackage.version}</FooterText>
          </FooterContainer>
        </Container>
      </LinearGradient>
    </>
  )
}

export default Version;