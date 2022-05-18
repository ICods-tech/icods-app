import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ForgotPasswordPopUPModal = styled.Modal`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ForgotPasswordPopUPContainer = styled.View`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.medium_line}

  align-items: center;
  justify-content: center;
`;

export const ForgotPasswordHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-top: ${RFValue(12)}px;
  margin-right: ${RFValue(24)}px;
`;

export const CloseIconContainer = styled.TouchableOpacity``;

export const ForgotPasswordPopUPSubContainer = styled.View`
  background-color: #fff;
  width: 80%;
  height: 32%;
  border-radius: ${RFValue(8)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(24)}px;
`;

export const ForgotPasswordPopUPSubContainerIconContainer = styled.View`
  margin-top: ${RFValue(4)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(16)}px;
`;

export const ForgotPasswordPopUPSubContainerTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
  line-height: ${RFValue(22)}px;
  font-family: Manrope;
  letter-spacing: ${RFValue(0.002)}px;
  color: #282c37;
`;

export const ForgotPasswordPopUPSubContainerText = styled.Text`
  width: 85%;
  text-align: center;
  margin-top: ${RFValue(15)}px;
  margin-bottom: ${RFValue(24)}px;
  font-size: ${RFValue(13)}px;
  font-weight: 600;
  line-height: ${RFValue(22)}px;
  font-family: Manrope;
  letter-spacing: ${RFValue(0.002)}px;
  color: #282c37;
  opacity: 0.57;
`;