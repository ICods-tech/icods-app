import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
    align-items: center;
    justify-content: center;  
`;

export const PercentageText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  text-align: center;
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  color: #2B90D9;
`;

export const WaitText = styled.Text`
  margin-top: ${RFValue(24)}px;
  color: rgba(0, 0, 0, 0.87);
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  line-height: 38px;
  text-align: center;
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;

export const ProcessingText = styled.Text`
  font-weight: 600;
  width: 350px;
  margin-top: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;