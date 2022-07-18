import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: ${RFValue(56)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light_500};
  align-items: center;
  justify-content: space-around;
`;