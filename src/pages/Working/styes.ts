import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.colors.shape};
  padding: 0 ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.gray_600};
  font-family: ${({ theme }) => theme.fonts.extra_bold};
`;

export const ContainerTitle = styled.View`
  width: 100%;
  margin-top: ${RFValue(36)}px;
  margin-bottom: ${RFValue(48)}px;
`;

export const ContainerMessage = styled.View`
  width: 100%;
  margin-top: ${RFValue(36)}px;
`;

export const Message = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray_200};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  opacity: 0.57;
  letter-spacing: ${Dimensions.get('window').width * 0.0005}px;

`;
