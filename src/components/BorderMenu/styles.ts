import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';


export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.cloudly};
  align-items: center;
  justify-content: space-evenly;
`;



export const BorderTop = styled.View`
    margin-bottom: 5px;    
    height: ${RFValue(2)}px;
    width: ${RFValue(24)}px;
    background-color: ${({ theme }) => theme.colors.primary};    
`;