import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    height: ${RFValue(36)}px;
    background-color: ${({ theme }) => theme.colors.shape};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${RFValue(116)}px;
`;

export const Button = styled(RectButton)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};

    flex-direction: row;    
    align-items: center;
    justify-content: center;

`;


export const IconContainer = styled.View`
    padding: ${RFValue(8)}px;
`;

interface ButtonTextProps {
    textColor?: string;
}

export const ButtonText = styled.Text<ButtonTextProps>`
    color: ${({ theme, textColor }) => 
    textColor ? textColor : theme.colors.primary};
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    letter-spacing: ${Dimensions.get('window').width*0.001}px;
`;