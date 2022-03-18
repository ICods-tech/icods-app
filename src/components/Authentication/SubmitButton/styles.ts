import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

interface Props {
  loading: boolean;
}

export const Button = styled(RectButton)<Props>`
  width: 100%;
  height: ${RFValue(36)}px;

  border-radius: 116px;
  background-color: ${({theme}) => theme.colors.primary};

  align-items: center;
  justify-content: center;

  ${({enabled, loading}) =>
    !enabled || loading
      ? css`
          opacity: 0.5;
        `
      : css`
          opacity: 1;
        `}
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  color: ${({theme}) => theme.colors.shape};
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
`;
