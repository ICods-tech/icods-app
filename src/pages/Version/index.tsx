import React from 'react';
import jsonPackage from '../../../package.json';
import Logo from '../../assets/images/iCods_logo.svg';
import Header from '../../components/Header';
import {Container, FooterContainer, FooterText} from './styles';

const Version = () => {
  return (
    <Container>
      <Header title="Versão do Aplicativo" navigate="back" whiteMode={true} />
      <Logo />
      <FooterContainer>
        <FooterText>iCods App</FooterText>

        <FooterText>Versão {jsonPackage.version}</FooterText>
      </FooterContainer>
    </Container>
  );
};

export default Version;
