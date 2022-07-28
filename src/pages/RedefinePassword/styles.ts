import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';


interface Props {
  isKeyboardVisible: boolean;
}

interface BottomTextHighlightProps {
  disabled: boolean;
}

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
`;

export const BackButtonContainer = styled.View<Props>`
  position: absolute;
  top: ${({ isKeyboardVisible }) =>
    isKeyboardVisible ? RFValue(26) : RFValue(21) + getStatusBarHeight()}px;
  left: ${RFValue(16)}px;
`;

export const RedefinePasswordForm = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  }
}) <Props>`
  width: 100%;
  padding: 0 ${RFValue(8)}px;
  margin-top: ${({ isKeyboardVisible }) => isKeyboardVisible ? RFValue(48) : 0}px;
`;

export const RedefinePasswordFormLabel = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  padding: 0 ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin: ${RFValue(24)}px ${RFValue(0)}px ${RFValue(20)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({ theme }) => theme.colors.dark_800};
`;

export const NicknameContainer = styled.View`
  background: ${({ theme }) => theme.colors.white};
  margin: ${RFValue(0)}px ${RFValue(28)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(8)}px;
  border: ${RFValue(1)}px solid #2b90d9;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const NicknameText = styled.Text`
  margin: auto;
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: 500;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

interface ErrorStyleProps {
  isErrored?: boolean;
}

export const InputContainer = styled.View<ErrorStyleProps>`
  margin: 0 ${RFValue(32)}px ${RFValue(30)}px;
  border: 1px solid
    ${({ isErrored, theme }) =>
    isErrored ? theme.colors.attention : theme.colors.light_line};
  border-radius: 4px;
`;

export const SpacingLine = styled.View<ErrorStyleProps>`
  height: 1px;
  background-color: ${({ isErrored, theme }) =>
    isErrored ? theme.colors.attention : theme.colors.light_line};
`;

export const RedefinePasswordFormSendButton = styled.TouchableNativeFeedback``;

export const RedefinePasswordFormSendButtonContainer = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  width: 80%;
  height: 40px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(116)}px;
`;

export const RedefinePasswordFormSendButtonLabel = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({ theme }) => theme.colors.white};
`;


export const FieldsRow = styled.View`
  flex-direction: row;
  align-self: center;
`;

export const EmailText = styled(RedefinePasswordFormLabel)`
 color: ${({ theme }) => theme.colors.primary};
 font-family: ${({ theme }) => theme.fonts.semi_bold};
`
export const ContainerButton = styled.View`
  width: 80%;
  height: ${RFValue(38)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: ${RFValue(16)}px;
`;

export const BottomTextContainer = styled.TouchableOpacity`
  margin-top: ${RFValue(4)}px;
`

export const BottomTextHighlight = styled.Text<BottomTextHighlightProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme, disabled }) => disabled ? theme.colors.gray_400_2 : theme.colors.primary};
  text-align: center;
  font-size: ${RFValue(10)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme, disabled}) => disabled ? theme.colors.gray_400_2 : theme.colors.primary};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`