import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  width: 100%;
  padding: 0px ${RFValue(11)}px;
  border-radius: ${RFValue(10)}px;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04)
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  height: ${RFValue(64)}px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  `

export const Main = styled.View`
  flex-direction: row;
  align-items: center;
  `;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: ${RFValue(24)}px;
`;

export const ButtonText = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: #282C37;
`
