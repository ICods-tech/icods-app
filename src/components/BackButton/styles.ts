import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Back from '../../assets/images/new-back-button-white.svg';

export const Container = styled.View`
  border: 1.5px solid ${({theme})=> theme.colors.primary};
  border-radius: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  height: ${RFValue(32)}px;
  width: ${RFValue(32)}px; 

`;

export const BackIcon = styled(Back).attrs({
    width: RFValue(32),
    height: RFValue(32)
})`
`;