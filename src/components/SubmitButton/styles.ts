import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

interface Props {
  loading: boolean;
  darkMode: boolean;
}

export const Button = styled(RectButton)<Props>`
  width: 100%;
  height: ${RFValue(40)}px;
  border-radius: 116px;
  background-color: ${({theme, darkMode}) =>
    darkMode ? theme.colors.white : theme.colors.primary};

  align-items: center;
  justify-content: center;

  ${({enabled, loading}) =>
    !enabled || loading
      ? css`
          background-color: ${({theme}) => theme.colors.gray};
          opacity: 0.5;
        `
      : css`
          opacity: 1;
        `}
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  color: ${({theme}) => theme.colors.white};
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
`;
