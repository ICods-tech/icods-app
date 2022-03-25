import styled, {css} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RectButton} from 'react-native-gesture-handler';

interface Props {
  isKeyboardVisible: boolean;
}

export const ScrollRegister = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: RFValue(12),
  },
})``;

export const Container = styled.View`
  flex: 1;
`;
export const BackButtonContainer = styled.View<Props>`
  position: absolute;
  top: ${({isKeyboardVisible}) =>
    isKeyboardVisible ? RFValue(34) : RFValue(21) + getStatusBarHeight()}px;
  left: ${RFValue(16)}px;
`;

export const Form = styled.View<Props>`
  width: 100%;
  padding: 0 ${RFValue(55)}px;
  margin-top: ${RFValue(24)}px;
`;

export const RegisterTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin-bottom: ${RFValue(17)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.title};
`;

export const InputContainer = styled.View``;

export const SubmitButtonContainer = styled.View`
  margin-top: ${RFValue(25)}px;
`;

export const UseTermsContainer = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  margin-top: ${RFValue(19)}px;
`;

export const UseTermsConfirmedButton = styled(RectButton)`
  display: flex;
  flex-direction: row;
`;

interface UseTermsProps {
  useTermsPressed: boolean;
}

export const UseTermsChecked = styled.View<UseTermsProps>`
  width: ${RFValue(12)}px;
  height: ${RFValue(12)}px;
  border-radius: ${RFValue(2)}px;
  background-color: ${({theme}) => theme.colors.shape};
  ${({useTermsPressed, theme}) =>
    useTermsPressed &&
    css`
      background-color: ${theme.colors.primary};
    `}

  border-width: 1px;
  border-color: ${({theme}) => theme.colors.gray};
`;

export const UseTermsText = styled.Text`
  font-size: ${RFValue(9.89)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.gray};

  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  line-height: ${RFValue(13.51)}px;

  margin-left: ${RFValue(8)}px;
`;

export const UseTermsShowButton = styled(RectButton)``;

export const UseTermsButtonText = styled.Text`
  font-size: ${RFValue(9.89)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.primary};
  text-decoration: underline;
  line-height: ${RFValue(13.51)}px;

  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
`;
