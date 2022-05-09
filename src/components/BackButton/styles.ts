import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Back from '../../assets/images/new-back-button-white.svg';
import BackBlue from '../../assets/images/back-button-blue.svg';

interface ContainerProps {
  color?: 'blue' | 'white';
}

export const Container = styled.View<ContainerProps>`
  border-radius: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  align-items: center;
  justify-content: center;
  height: ${RFValue(32)}px;
  width: ${RFValue(32)}px;
`;

export const BackWhiteIcon = styled(Back).attrs({
  width: RFValue(32),
  height: RFValue(32),
})``;

export const BackBlueIcon = styled(BackBlue).attrs({
  width: RFValue(32),
  height: RFValue(32),
})``;
