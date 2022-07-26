import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ICustomTextProps } from '.';
import { setLetterSpacing } from '../../../styles/spaces';

type TextContainerProps = Omit<ICustomTextProps, "title">

export const TextContainer = styled.Text<TextContainerProps>`
  font-family: ${({ family }) => family};
  font-size: ${({ size }) => RFValue(size!)}px;
  text-align: ${({ align }) => align};

  color: ${({ color }) => color};
  letter-spacing: ${({ letterSpacing }) => setLetterSpacing(letterSpacing)}px;
  
  ${({ lineHeight }) =>
    lineHeight &&
    css`
       line-height: ${RFValue(lineHeight)}px;
    `};

  ${({ isWordCapitalize }) =>
    isWordCapitalize &&
    css`
      text-transform: capitalize;
    `};
`;
