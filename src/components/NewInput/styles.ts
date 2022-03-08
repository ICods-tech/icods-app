import {Dimensions, TextInput} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

import OpenEye from '../../assets/images/eye_open.svg';
import ClosedEye from '../../assets/images/eye_closed.svg';

interface Props {
  isErrored: boolean;
}

export const Container = styled.View<Props>`
  width: 100%;
  height: ${RFValue(48)}px;

  flex-direction: row;
  align-items: center;

  border: 0.5px solid ${({theme}) => theme.colors.light_line};

  ${({isErrored}) =>
    isErrored &&
    css`
      border: 0.5px solid ${({theme}) => theme.colors.attention};
    `} */
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  padding-left: ${RFValue(10)}px;
  color: ${({theme, isErrored}) =>
    isErrored ? theme.colors.attention : theme.colors.dark};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const IconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  height: 100%;
  justify-content: center;
  padding: 0 ${RFValue(19)}px 0 ${RFValue(10)}px;
`;

interface ButtonEyeProps {
  activate?: boolean;
}

export const ButtonEye = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})<ButtonEyeProps>`
  justify-content: center;
  height: 100%;
  padding: 0 ${RFValue(10)}px;
  ${({activate}) =>
    !activate &&
    css`
      display: none;
    `};
`;

export const ClosedEyeIcon = styled(ClosedEye).attrs({
  width: RFValue(16),
  height: RFValue(16),
})<ButtonEyeProps>`
  ${({activate}) =>
    !activate &&
    css`
      display: none;
    `};
`;

export const OpenEyeIcon = styled(OpenEye).attrs({
  width: RFValue(16),
  height: RFValue(16),
})<ButtonEyeProps>`
  ${({activate}) =>
    !activate &&
    css`
      display: none;
    `};
`;
