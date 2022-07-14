import React from 'react';
import { CategoriesText, RightArrowIcon } from '../../pages/About/styles';

import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import {
  Button,
  Container,
  IconContainer,
  Main
} from './styles';

interface AboutButtonProps extends RectButtonProps {
  title: string;
  icon: any;
}

export function AboutButton({ icon: Icon, title, ...rest }: AboutButtonProps) {
  const theme = useTheme();
  return (
    <Container>
      <Button {...rest}>
        <Main>
          <IconContainer>
            <Icon color={theme.colors.title} />
          </IconContainer>
          <CategoriesText>{title}</CategoriesText>
        </Main>
        <RightArrowIcon />
      </Button>
    </Container>
  );
}