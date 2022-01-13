import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: ${RFPercentage(100)}px;
`;

export const QRCodeText = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.title};
    text-align: center;
    letter-spacing: ${RFValue(0.18)}px;
    margin-bottom: ${RFValue(36)}px;
`;