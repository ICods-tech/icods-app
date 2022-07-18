import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const BorderTop = styled.View`
    position: absolute;
    top: 0;
    height: ${RFValue(2)}px;
    width: ${RFValue(24)}px;
    background-color: ${({ theme }) => theme.colors.primary};    
`;