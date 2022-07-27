import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import GiftIcon from '../../assets/images/Icons/editor/gift-open.svg'
import { RFValue } from 'react-native-responsive-fontsize';

const { height, width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  width: ${width}px;
  height: ${height}px;
`;

export const GiftContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${width}px;
  width: ${width * 0.4}px;
  height: ${width * 0.4}px;
`;

export const Gift = styled(GiftIcon).attrs({})``;

export const GiftOpenTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-weight: 700;
  font-size: ${RFValue(28)}px;

  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${RFValue(35)}px;
`;

export const GiftOpenSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-weight: 400;
  font-size: ${RFValue(14)}px;
  width: ${width * 0.7}px;
  text-align: center;

  color: ${({ theme }) => theme.colors.gray_200};
  margin-bottom: ${RFValue(36)}px;
`;

export const GiftOpenButtonContainer = styled.View`
  width: ${width * 0.7}px;
`;
