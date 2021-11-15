import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsIconsProps } from '../../components/History/FilterModal';


export const ColorsButtonList = styled(
    FlatList as new () => FlatList<colorsIconsProps>
    ).attrs({
        showsHorizontalScrollIndicator: false,
        horizontal: true,
})`
`;


interface ColorButtonProps {
    selectedColor: Colors;
    color: Colors;
}

export const ColorButton = styled.TouchableOpacity<ColorButtonProps>`
    width: ${RFValue(16)}px;
    height: ${RFValue(16)}px;
    align-items: center;
    justify-content: center;
    ${({selectedColor, color}) => selectedColor === color && css`
        width: ${RFValue(20)}px;
        height: ${RFValue(20)}px;
        padding: ${RFValue(10)}px ${RFValue(10)}px;
        border-width: ${RFValue(2)}px;
        border-radius: ${RFValue(4)}px;
        border-color: ${({theme}) => theme.colors.title};
    `};
`;

export const Separator = styled.View`
    width: ${RFValue(14)}px;
    height: 100%;
    background-color: white;
`;