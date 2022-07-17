import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  margin-top: ${RFValue(20)}px;
`;

interface ITitleProps {
  whiteMode: boolean;
}

export const Title = styled.Text<ITitleProps>`
  font-family: ${({ theme }) => theme.fonts.semi_bold};
  font-size: ${RFValue(24)};
  color: ${({ whiteMode, theme }) => whiteMode ? theme.colors.white : theme.colors.dark_800};
  margin-left: ${RFValue(16)};
`;
