import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: ${RFPercentage(100)}px;
`;

export const ContentContainer = styled.View`
  align-items: center;
  height: ${RFPercentage(60)}px;
`;

export const TitleText = styled.Text`
  font-size: ${RFValue(28)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.dark_800};
  text-align: center;
  max-width: ${RFPercentage(50)}px;
  letter-spacing: ${RFValue(0.18)}px;
  margin-bottom: ${RFPercentage(4)}px;
`;

export const DescriptionText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.subtitle};
  text-align: center;
  max-width: ${RFPercentage(45)}px;
  letter-spacing: ${RFValue(0.18)}px;
  margin-bottom: ${RFPercentage(6)}px;
`;

export const IconBackground = styled.View`
  width: ${RFPercentage(18)}px;
  height: ${RFPercentage(18)}px;
  border-radius: ${RFPercentage(50)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFPercentage(6)}px;
`

export const BackStringContainer = styled.TouchableOpacity``

export const BackStringText = styled.Text`
  margin-top: ${RFPercentage(2)}px;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  text-decoration: underline;
  max-width: ${RFPercentage(45)}px;
  letter-spacing: ${RFValue(0.18)}px;
`