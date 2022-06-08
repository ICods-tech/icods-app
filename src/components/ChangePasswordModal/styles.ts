import styled, { css, } from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { BorderlessButton, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``

interface IModalContainter {
  isFooterButtonsActived: boolean;
}

export const ModalContainer = styled.View<IModalContainter>`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.shape};
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(4)}px;

  ${({ isFooterButtonsActived }) => isFooterButtonsActived ?
    css`padding-bottom: ${RFValue(8)}px;` :
    css`padding-bottom: ${RFValue(47)}px;`}
`;


export const CloseButtonContainer = styled(GestureHandlerRootView)`
  position: absolute;
  top: ${RFValue(8)}px;
  right: ${RFValue(8)}px;
`;

export const CloseButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  height: ${RFValue(36)}px;
  width: ${RFValue(36)}px;
`;

interface IIcontainerProps {
  backgroundColor: string;
}

export const IconContainer = styled.View<IIcontainerProps>`
  margin-top: ${RFValue(50)}px;

  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(30)}px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const InfoTextContainer = styled.View`
  margin-top: ${RFValue(23)}px;
  width: 100%;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const InfoTitleContainer = styled.View`
  padding: 0 ${RFValue(20)}px;
`;

export const InfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.extra_bold};
  font-size: ${RFValue(16)}px;
  text-align: center;
  line-height: ${RFValue(22)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  color: ${({ theme }) => theme.colors.title};
`
export const PasswordsContainer = styled.View`
  padding: 0 ${RFValue(28)}px;
  padding-top: ${RFValue(36)}px;
`;
export const InfoDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semi_bold};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
`
export const Footer = styled(GestureHandlerRootView)`
  flex-direction: row;
  align-self: flex-end;
  padding-right: ${RFValue(8)}px;
  margin-top: ${RFValue(36)}px;
`;

export const BottomButton = styled(RectButton)`
  height: ${RFValue(36)}px;
  margin-left: ${RFValue(8)}px;
  align-items: center;
  justify-content: center;
  padding: 0 ${RFValue(8)}px;

  border-radius: ${RFValue(4)}px;
`;

interface IFooterButtonTextProps {
  color: "save" | "cancel";
}

export const FooterButtonText = styled.Text<IFooterButtonTextProps>`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.semi_bold};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(24)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  color: ${({ color, theme }) => color === 'save' ? theme.colors.primary : theme.colors.cancelTextButton};
`;