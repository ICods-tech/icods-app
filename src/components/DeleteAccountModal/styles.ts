import styled, { css, } from 'styled-components/native';
import { colorsIconsProps } from '.';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const DeleteAccountIconContainer = styled.View`
  display: flex;
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  border-radius: ${RFValue(30)}px;
  background: #ce3e36;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(8)}px;
`;

export const CloseButtonContainer = styled.View`
  margin-top: ${RFValue(12)}px;
  margin-right: ${RFValue(16)}px;
  display: flex;
  align-items: flex-end;
`;

export const ModalContainer = styled.View`
  width: ${RFValue(320)}px;
  height: ${RFValue(270)}px;
  background-color: ${({ theme }) => theme.colors.shape};

  justify-content: center;
  border-radius: ${RFValue(8)}px;
`;

export const ExcludeAccountTextContainer = styled.View`
  margin-top: ${RFValue(16)}px;
  display: flex;
  align-self: center;
  width: ${RFPercentage(44.0)};
  align-items: center;
  justify-content: center;
`;

export const ExcludeAccountTitle = styled.Text`
  font-family: Manrope;
  font-style: normal;
  font-weight: 800;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(22)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: #282C37;
`

export const ExcludeAccountDescription = styled.Text`
  font-family: Manrope;
  font-style: normal;
  text-align: center;
  font-weight: 600;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(22)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  align-self: center;
  margin-top: ${RFValue(12)}px;
  color: rgba(0, 0, 0, 0.4);
`

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: flex-end;

  padding-bottom: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
  margin-bottom: ${RFValue(8)}px;
`;

export const BottomButton = styled.TouchableOpacity`
  padding: ${RFValue(6)}px ${RFValue(8)}px;
  margin-left: ${RFValue(8)}px;
  
  align-items: center;
  justify-content: center;
`;

export const ModalConfirmButtonText = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  
  color: ${({ theme }) => theme.colors.primary};
`;

export const ModalCancelButtonText = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  color: rgba(0, 0, 0, 0.4);
`;