import styled, { css } from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { colorsIconsProps } from '../../components/History/FilterModal';
import { Colors } from '../../interfaces/colors';
import { CardColors } from '../../components/History/HistoryCards';
import QRCodeTemplate from '../../assets/images/qrCodeLargeTemplate.svg'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
    flex: 1;
    margin-top: ${RFValue(18)}px;
    align-items: center;
    flex-direction: column;
`;



export const SaveChangesContainer = styled.View`
display: flex;
flex-direction: column;
align-items: center;
margin-top: ${RFValue(20)}px;
height: ${RFValue(156)}px;
justify-content: flex-start;
`;

export const QRCodeContainer = styled.View`
    align-self: center;
    padding-top: ${RFValue(10)}px;
    align-items: center;
    margin-right: ${RFPercentage(3.8)}px;
`;

export const QRCodeInfoTopContainer = styled.View`
    display: flex;
    width: ${RFValue(320)}px;
    flex-direction: row;
    justify-content: flex-end;
`;

export const IconsContainer = styled.View`
    display: flex;
    margin-top: ${RFPercentage(2.5)}px;
    flex-direction: column;
    margin-right: ${RFPercentage(3.8)}px;
`;

export const QRCodeInfoContainer = styled.View`
    flex: 1;
    align-items: center;
    width: ${RFValue(320)}px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    border-width: ${RFValue(2)}px;
    border-radius: ${RFValue(12)}px;
    border-color: rgba(0, 0, 0, 0.15);
    border-top-width: ${RFValue(0.1)}px;
    shadow-offset: 0px 10px;
    shadow-color: #000;
    shadow-opacity: 0.25;
    shadow-radius: ${RFValue(10)}px;
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
    margin-top: ${RFValue(12)}px;
`;

export const QRCodeTemplateImg = styled(QRCodeTemplate).attrs({
    width: RFValue(142),
    height: RFValue(142),
})``;


export const ColorSelectContainer = styled.View`
    align-items: center;
    margin-top:  ${RFValue(20)}px;
    margin-bottom:  ${RFValue(8)}px;
`;

export const TitleColorSelect = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width * 0.002}px;

    margin-bottom: ${RFValue(8)}px;
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
