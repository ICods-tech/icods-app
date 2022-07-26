import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

export const Gradient = styled.View`
  height: ${RFValue(128)}px;
  width: ${RFValue(128)}px;
  border-radius: ${RFValue(20)}px;
  margin: 0 ${RFValue(8)}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Button = styled(RectButton)`
  height: 100%;
  width: 100%;

  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.semi_bold};

  color: ${({theme}) => theme.colors.white};

  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  margin-top: ${RFValue(8)}px;
`;
