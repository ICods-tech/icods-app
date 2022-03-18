import {Dimensions, TextInput} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

interface Props {
  isErrored: boolean;
}

export const Container = styled.View<Props>`
  width: 100%;
  height: ${RFValue(48)}px;

  flex-direction: row;
  align-items: center;

  border: 0.8px solid ${({theme}) => theme.colors.light_line};

  ${({isErrored}) =>
    isErrored &&
    css`
      border: 0.8px solid ${({theme}) => theme.colors.attention_light};
    `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme, isErrored}) =>
    isErrored ? theme.colors.attention : theme.colors.dark};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const IconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  /* height: 100%; */
  justify-content: center;
  align-items: center;
  padding: 0 ${RFValue(10)}px 0 ${RFValue(10)}px;
`;

export const ButtonEye = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  justify-content: center;
  height: 100%;
  padding: 0 ${RFValue(10)}px;
`;
