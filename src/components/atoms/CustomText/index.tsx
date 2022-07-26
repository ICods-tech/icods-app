import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../../global/styles/theme';
import { TextContainer } from './styles';

export interface ICustomTextProps {
  size?: number;
  title: string;
  color?: string;
  family?: string;
  lineHeight?: number;
  letterSpacing?: number;
  isWordCapitalize?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export function CustomText({
  lineHeight,
  letterSpacing,
  align = 'left',
  size = RFValue(16),
  color = theme.colors.black,
  family = theme.fonts.regular,
  title,
  isWordCapitalize = false,
}: ICustomTextProps) {
  return (
    <TextContainer
      size={size}
      align={align}
      color={color}
      family={family}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      isWordCapitalize={isWordCapitalize}>
      {title}
    </TextContainer>
  );
}