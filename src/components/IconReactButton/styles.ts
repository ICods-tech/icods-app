import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
import theme from '../../global/styles/theme';

type IColors = 'White' | 'Blue' | 'Gray';
interface ButtonProps {
  color?: IColors;
}

const backgroundColor = {
  White: '#FFF',
  Blue: theme.colors.primary,
  Gray: theme.colors.gray,
};

const textColor = {
  White: theme.colors.primary,
  Blue: '#FFF',
  Gray: '#FFF',
};

export const Container = styled.View<ButtonProps>`
  border-radius: 116px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 2;
`;

export const Button = styled(RectButton)<ButtonProps>`
  flex-direction: row;
  width: ${RFValue(266)}px;
  height: ${RFValue(36)}px;
  background-color: ${({color}) => backgroundColor[color || 'Blue']};
  border-radius: 116px;
  align-items: center;
  justify-content: center;
`;

export const IconContainer = styled.View`
  height: 100%;
  width: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
  margin-right: ${RFValue(8)}px;
`;
export const Title = styled.Text<ButtonProps>`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  margin-bottom: ${RFValue(2)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  color: ${({color}) => textColor[color || 'Blue']};
`;
