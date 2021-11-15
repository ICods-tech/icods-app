import styled, { css, } from 'styled-components/native';
import Red from '../../../assets/images/Icons/colors/red.svg'
import Blue from '../../../assets/images/Icons/colors/blue.svg'
import Cyan from '../../../assets/images/Icons/colors/cyan.svg'
import Green from '../../../assets/images/Icons/colors/green.svg'
import Black from '../../../assets/images/Icons/colors/black.svg'
import Pink from '../../../assets/images/Icons/colors/pink.svg'
import Yellow from '../../../assets/images/Icons/colors/yellow.svg'
import NoColor from '../../../assets/images/Icons/colors/none.svg'
import { colorsIconsProps } from '.';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container =  styled.View``;

export const ModalContainer = styled.View`
    width: ${RFValue(308)}px;
    height: ${RFValue(416)}px;
    background-color: ${({theme}) => theme.colors.shape};

    justify-content: center;
    border-radius: 8px;
`;

export const ColorsContainer = styled.View`
    align-items: center;
    justify-content: center;

    margin-top: ${RFValue(50)}px; 
    margin-bottom: ${RFValue(28)}px;
`;

export const ColorOrderContainer = styled.View`
    margin-bottom: ${RFValue(28)}px;
`;

export const ColorOrderText = styled.Text`
    font-family: ${({theme}) => theme.fonts.extra_bold};
    font-size: ${RFValue(16)}px;

    color: ${({theme}) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;

export const ColorsButtonList = styled(
    FlatList as new () => FlatList<colorsIconsProps>
    ).attrs({
        showsHorizontalScrollIndicator: false,
        horizontal: true,
})``;



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

export const DataContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: 0 ${RFValue(20)}px;
`;

export const DataText = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme}) => theme.fonts.extra_bold};
    color: ${({theme}) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
    margin-bottom: ${RFValue(28)}px;
`;

export const SubmitButton = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.primary};
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${RFValue(36)}px;

    border-radius: ${RFValue(4)}px;
`;

export const SubmitButtonText = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape};
    letter-spacing: ${Dimensions.get('window').width*0.001}px;
`;


export const Footer = styled.View`
    flex: 1;
    flex-direction: row;
    align-self: flex-end;
    align-items: flex-end;

    padding-bottom: ${RFValue(8)}px;
    padding-right: ${RFValue(8)}px;

`;

export const BottomButton = styled.TouchableOpacity`
    padding: ${RFValue(6)}px ${RFValue(8)}px;
    margin-left: ${RFValue(8)}px;
    
    align-items: center;
    justify-content: center;
`;

export const ModalConfirmButtonText = styled.Text`
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width*0.001}px;
    
    color: ${({theme}) => theme.colors.primary};
`;

export const ModalCancelButtonText = styled.Text`
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width*0.001}px;
    
    color: ${({theme}) => theme.colors.secundary};
`;

export const CalendarContainer = styled.View`
    opacity: 1;
    align-self: flex-start;
`;

export const BlackIcon = styled(Black).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;

export const BlueIcon = styled(Blue).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;

export const CyanIcon = styled(Cyan).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;

export const GreenIcon = styled(Green).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;

export const RedIcon = styled(Red).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;

export const PinkIcon = styled(Pink).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;

export const YellowIcon = styled(Yellow).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;

export const NoColorIcon = styled(NoColor).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;
