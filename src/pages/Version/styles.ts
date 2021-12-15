import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(12)}px;
  margin-left: ${RFValue(16)}px;
`

export const FooterContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
`

export const HeaderText = styled.Text`
  font-family: Manrope;
  font-style: normal;
  font-weight: 800;
  height: ${RFValue(36)}px;
  margin-left: ${RFValue(16)}px;
  font-size: ${RFValue(24)}px;
  line-height: ${RFValue(22)}px;
  align-self: center;
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  color: #FFF;
  align-self: center;
  justify-content: center;
  padding-top: ${RFValue(10)}px;
`

export const FooterText = styled.Text`
  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(22)}px;
  text-align: center;
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  color: #FFF;
`