import styled, { DefaultTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ICellProps {
  focused: boolean;
  isCorrect: boolean;
  errored: boolean;
  editable: boolean;
}

interface IHandleBorderColor {
  theme: DefaultTheme;
  focused: boolean;
  errored: boolean;
}

const handleBorderColor = ({ theme, focused, errored }: IHandleBorderColor) => {
  if (focused) return theme.colors.primary
  else {
    return errored ? theme.colors.attention : theme.colors.gray
  }
}

export const CellText = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Cell = styled.View<ICellProps>`
  width: ${RFValue(38)}px;
  height: ${RFValue(38)}px;
  border-width: 1px;
  margin-left: ${RFValue(8)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, editable }) => editable ? theme.colors.white : theme.colors.light_line}; 
  border-color: ${({ theme, focused, errored }) => handleBorderColor({ theme, focused, errored })};
`;
