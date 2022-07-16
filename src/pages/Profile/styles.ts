import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Gradient = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  colors: ['#2B90D9', '#53C4E8'],
  style: { flex: 1 }
})`

height: ${Dimensions.get('window').height * 0.4 + getStatusBarHeight()}px;
`;

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
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: #282C37;
`