import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

export const ModalContainer = styled.Modal`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScreenContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
`;

export const SubContainer = styled.View`
  background-color: #fff;
  width: 80%;
  height: 75%;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  font-size: ${RFValue(14)}px;
  lineheight: 22px;
  margin: 16px 0;
  color: rgba(0, 0, 0, 0.87);
`;

export const TextContainer = styled.ScrollView`
  width: 90%;
  height: 50%;
`;

export const TextContainerTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semi_bold};
  font-size: ${RFValue(14)}px;
  lineheight: 19px;
  margintop: 8px;
  color: rgba(0, 0, 0, 0.87);
`;

export const TextContainerText = styled.Text`
  width: 95%;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.87);
`;

export const ButtonsContainer = styled(GestureHandlerRootView)`
  width: 90%;
  height: 10%;
  margin: 8px 0 0 0;
  flex-direction: row;
  justify-content: flex-end;
`;

export const BottomButton = styled(RectButton)`
  margin-left: ${RFValue(8)}px;
  height: ${RFValue(36)}px;
  align-items: center;
  justify-content: center;
  margin: 0 4px;

  padding: 0 ${RFValue(4)}px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${RFValue(32)}px;
`;

export const ButtonLabelConfirm = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonLabelCancel = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;

  color: ${({ theme }) => theme.colors.cancelButton};
  opacity: 0.4;
`;
