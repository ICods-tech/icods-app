import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: ${RFValue(56)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cloudly};
  align-items: center;
  justify-content: center;
  padding-bottom: ${RFValue(5)}px;
`;

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family:${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(10)}px;
`;