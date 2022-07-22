import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 ${RFValue(16)}px;
  background: ${({theme}) => theme.colors.primary};
  justify-content: space-between;
`;

export const FooterContainer = styled.View`
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(32)}px;
`;

export const FooterText = styled.Text`
  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(22)}px;
  text-align: center;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: #fff;
`;
