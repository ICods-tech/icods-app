import React from 'react';
import { useTheme } from 'styled-components/native';
import { CustomText } from '../CustomText';

import {
  Container,
} from './styles';

interface IRouteTitleProps {
  title: string;
  isActivated: boolean;
}

export function RouteTitle({ title, isActivated }: IRouteTitleProps) {
  const theme = useTheme();

  const fontStyle = {
    titleColor: theme.colors.dark_800,
    titleFontFamily: theme.fonts.light,
  }

  if (isActivated) {
    fontStyle.titleColor = theme.colors.primary;
    fontStyle.titleFontFamily = theme.fonts.bold;
  }

  return (
    <Container>
      <CustomText
        size={10}
        title={title}
        color={fontStyle.titleColor}
        family={fontStyle.titleFontFamily}
        letterSpacing={0.0002}
      />
    </Container>
  );
}