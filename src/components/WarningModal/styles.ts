import styled, { css, } from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { BorderlessButton, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``

interface IModalContainter {
  isFooterButtonsActived: boolean;
}

export const ModalContainer = styled.View<IModalContainter>`
  width: ${RFValue(308)}px;
  /* height: ${RFValue(271)}px; */
  background-color: ${({ theme }) => theme.colors.shape};
  ${({isFooterButtonsActived}) => isFooterButtonsActived ?
   css`padding: ${RFValue(16)}px` :
   css`padding: ${RFValue(16)}px ${RFValue(16)}px  ${RFValue(47)}px ${RFValue(16)}px;`}
  justify-content: center;
  border-radius: ${RFValue(4)}px;
`;


export const CloseButtonContainer = styled(GestureHandlerRootView)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
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
  margin-top: ${RFValue(14)}

  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(30)}px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const ChangeInfoTextContainer = styled.View`
  margin-top: ${RFValue(23)}px;
  align-self: center;
  /* width: ${RFPercentage(44.0)}px; */
  align-items: center;
  justify-content: center;
`;

export const ChangeInfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  text-align: center;
  line-height: ${RFValue(22)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  color: ${({ theme }) => theme.colors.title};
`
export const ChangeInfoDescription = styled.Text`
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
  align-items: flex-end;

  margin-top: ${RFValue(36)}px;
`;

export const BottomButton = styled(RectButton)`
  height: ${RFValue(36)}px;
  margin-left: ${RFValue(8)}px;
  align-items: center;
  justify-content: center;
  padding: 0 ${RFValue(4)}px;

  background-color: ${({theme}) => theme.colors.shape};
  border-radius: ${RFValue(32)}px;
`;

interface IFooterButtonTextProps {
  color: "save" | "cancel";
}

export const FooterButtonText = styled.Text<IFooterButtonTextProps>`
  text-transform: uppercase;
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  color: ${({color, theme}) => color === 'save' ? theme.colors.primary : theme.colors.cancelButton};
`;