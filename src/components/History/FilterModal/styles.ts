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
import { Dimensions, FlatList, StyleSheet } from 'react-native';

export const Container = styled.View``;

export const ModalContainer = styled.View`
    width: ${RFValue(360)}px;
    height: ${RFValue(560)}px;
    background-color: ${({ theme }) => theme.colors.shape};

    justify-content: center;
    border-radius: 8px;
`;

export const ColorsContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(16)}px; 
    margin-bottom: ${RFValue(12)}px;
`;

export const ColorOrderContainer = styled.View`
    margin-bottom: ${RFValue(24)}px;
`;

export const ColorOrderText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.extra_bold};
    font-size: ${RFValue(16)}px;

    color: ${({ theme }) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const ColorsButtonList = styled(
  FlatList as new () => FlatList<colorsIconsProps>
).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    AlignItems: 'center',
  }
})`
  height: ${RFValue(50)}px;
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
    ${({ selectedColor, color }) => selectedColor === color && css`
        width: ${RFValue(32)}px;
        height: ${RFValue(32)}px;
        border-width: ${RFValue(2)}px;
        border-radius: ${RFValue(4)}px;
        border-color: ${({ theme }) => theme.colors.title};
    `};
`;

export const Separator = styled.View`
    width: ${RFValue(8)}px;
    height: ${RFValue(24)}px;
`;

export const DataContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: 0 ${RFValue(20)}px;
`;

export const DataText = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.extra_bold};
    color: ${({ theme }) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width * 0.002}px;
    margin-bottom: ${RFValue(28)}px;
`;

export const SubmitButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${RFValue(36)}px;

    border-radius: ${RFValue(4)}px;
`;

export const SubmitButtonText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.shape};
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
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
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
    
    color: ${({ theme }) => theme.colors.primary};
`;

export const ModalCancelButtonText = styled.Text`
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
    
    color: ${({ theme }) => theme.colors.cancelButton};
    opacity: 0.40;
`;

export const BlackIcon = styled(Black).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const BlueIcon = styled(Blue).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const CyanIcon = styled(Cyan).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const GreenIcon = styled(Green).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const RedIcon = styled(Red).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const PinkIcon = styled(Pink).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const YellowIcon = styled(Yellow).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const NoColorIcon = styled(NoColor).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const calendarStyles = StyleSheet.create({
  calendarContainer: {
    display: 'flex',
    width: 240,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarText: {
    fontSize: 14,
    fontFamily: 'Manrope'
  },
  selectedMonth: {
    fontSize: 18,
    fontFamily: 'Manrope',
    color: '#2B90D9'
  },
  monthText: {
    fontSize: 14,
    fontFamily: 'Manrope',
    color: '#000'
  },
  arrowCalendar: {
    fontSize: 20
  }
});