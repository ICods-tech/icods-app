import styled, { css } from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsIconsProps } from '../../components/History/FilterModal';
import { Colors } from '../../interfaces/colors';
import { CardColors } from '../../components/History/HistoryCards';
import QRCodeTemplate from '../../assets/images/qrCodeLargeTemplate.svg';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
    flex: 1;
    margin-top: ${RFValue(6)}px;
    align-items: center;
`;

export const QRCodeContainer = styled.View`
    padding-top: ${RFValue(10)}px;
    align-items: center;
`;

export const TitleQRCode = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.extra_bold};
    color: ${({ theme }) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

interface QRCodeImgContainerProps {
    updatedColor: Colors;
}

export const QRCodeImgContainer = styled.View<QRCodeImgContainerProps>`
    border-width: ${RFValue(4)}px;
    border-radius: ${RFValue(6)}px;
    border-color: ${({ theme, updatedColor }) => 
        updatedColor !== 'noColor' && updatedColor !== 'noFilter' ? 
        CardColors[updatedColor] : theme.colors.shape};

    margin-top: ${RFValue(20)}px;
`;

export const QRCodeTemplateImg = styled(QRCodeTemplate).attrs({
    width: RFValue(201),
    height: RFValue(201),
})``;


export const ColorSelectContainer = styled.View`
    align-items: center;
    margin-top:  ${RFValue(25)}px;
`;

export const TitleColorSelect = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width * 0.002}px;

    margin-bottom: ${RFValue(14)}px;
`;

export const ColorsSelectContainer =styled.View`
    margin-top: ${RFValue(14)}px;
    height: ${RFValue(40)}px;
`;

export const ColorsButtonList = styled(
    FlatList as new () => FlatList<colorsIconsProps>
    ).attrs({
        showsHorizontalScrollIndicator: false,
        horizontal: true,
    })`
        width: 100%;
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
    height: ${RFValue(10)}px;
`;


export const OptionsButtonsQRContainer = styled.View`
    margin-top: ${RFValue(16)}px;
    justify-content: space-between;
    align-items: center;
`;
