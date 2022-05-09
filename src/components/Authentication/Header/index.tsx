import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';

import {Container, Gradient, IcodsLogo, Title} from './styles';

interface HeaderProps {
  isKeyboardVisible: boolean;
}

export function Header({isKeyboardVisible}: HeaderProps) {
  const theme = useTheme();
  return (
    <Gradient isKeyboardVisible={isKeyboardVisible}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={
            isKeyboardVisible ? theme.colors.primary : 'transparent'
          }
          translucent={!isKeyboardVisible}
        />
        <IcodsLogo />
        <Title>Um novo jeito de compartilhar emoções</Title>
      </Container>
    </Gradient>
  );
}
