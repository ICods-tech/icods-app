import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0px ${RFValue(15)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;


export const Title = styled.Text`
  font-size: ${RFValue(24)}px;

  font-family: ${({ theme }) => theme.fonts.semi_bold};
  color: ${({ theme }) => theme.colors.dark_800};

  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  line-height: ${RFValue(33)}px;
  margin-left: ${RFValue(17)}px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(26)}px;
`;

export const OptionalButtonsContainer = styled.View`
  width: ${RFValue(80)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
