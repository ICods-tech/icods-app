import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsIconsProps } from '../History/FilterModal';

export const Container = styled.View`
  height: ${RFValue(50)}px;
`;

export const ColorsButtonList = styled(
  FlatList as new () => FlatList<colorsIconsProps>,
).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})``;

interface ColorButtonProps {
  selectedColor: Colors;
  color: Colors;
}

export const ColorButton = styled.TouchableOpacity<ColorButtonProps>`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;
  ${({ selectedColor, color }) =>
    selectedColor === color &&
    css`
      width: ${RFValue(36)}px;
      height: ${RFValue(36)}px;
      border-width: ${RFValue(2)}px;
      border-radius: ${RFValue(4)}px;
      border-color: ${({ theme }) => theme.colors.dark_800};
    `};
`;

export const Separator = styled.View`
  width: ${RFValue(5)}px;
  height: ${RFValue(10)}px;
`;
