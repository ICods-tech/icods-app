import styled, { css } from 'styled-components/native';
import { letterSpacing } from '../../../styles/spaces';

export const Container = styled.View``;

interface TitleProps {
  isActivated: boolean;
}

export const Title = styled.Text<TitleProps>`
font-size: 10px;
letter-spacing: ${letterSpacing()}px;

${({ isActivated, theme }) => isActivated ?
    css`
      color: ${theme.colors.primary};
      font-family: ${theme.fonts.bold};
    `
    :
    css`
      font-family: ${theme.fonts.light};
      color: ${theme.colors.dark_800};
    `}
`;