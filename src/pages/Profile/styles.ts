import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ActivitiesContainer = styled.View`
  margin-top: ${RFValue(52)}px;
  align-items: center;
`

export const Container = styled.View`
  flex: 1;
  height: ${Dimensions.get('window').height}px;
  background-color: #fff;
`

export const ActivitiesText = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  color: #282C37;
`