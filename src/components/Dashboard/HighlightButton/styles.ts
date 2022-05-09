import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

export const Gradient = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
  colors: ['#2B90D9', '#53C4E8'],
  style: {flex: 1},
})`
  height: ${RFValue(128)}px;
  width: ${RFValue(128)}px;
  border-radius: ${RFValue(20)}px;
  margin: 0 ${RFValue(8)}px;
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

  color: ${({theme}) => theme.colors.shape};

  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  margin-top: ${RFValue(8)}px;
`;
