import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsIconsProps } from '../History/FilterModal';

export const Container = styled.View`
    height: ${RFValue(36)}px;
`;

export const ColorsButtonList = styled(
    FlatList as new () => FlatList<colorsIconsProps>
    ).attrs({
        showsHorizontalScrollIndicator: false,
        horizontal: true,
        contentContainerStyle: {
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })`
    width: 100%;    
`;

interface ColorButtonProps {
    selectedColor: Colors;
    color: Colors;
}

export const ColorButton = styled.TouchableOpacity<ColorButtonProps>`
    width: ${RFValue(24)}px;
    height: ${RFValue(24)}px;
    align-items: center;
    justify-content: center;
    ${({selectedColor, color}) => selectedColor === color && css`
        width: ${RFValue(36)}px;
        height: ${RFValue(36)}px;
        border-width: ${RFValue(1)}px;
        border-radius: ${RFValue(4)}px;
        border-color: ${({theme}) => theme.colors.title};
    `};
`;

export const Separator = styled.View`
    width: ${RFValue(12)}px;
    height: ${RFValue(10)}px;
`;