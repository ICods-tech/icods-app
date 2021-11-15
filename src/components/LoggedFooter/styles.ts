import { Dimensions } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.cloudly};
    
    height: ${RFValue(56)}px;
    width: 100%;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: space-evenly;
`;

export const FooterButton = styled(RectButton)`
    height: 100%;
    width: ${RFValue(70)}px;
    align-items: center;
    justify-content: space-between;
    /* background-color: orange; */
`;

interface ButtonSelectedProps {
    selected?: boolean;
}

export const BorderTop = styled.View<ButtonSelectedProps>`
    height: ${RFValue(2)}px;
    width: ${RFValue(24)}px;
    background-color: ${({theme, selected}) => selected ? theme.colors.primary : theme.colors.background};    
`;

export const FooterButtonTitle = styled.Text<ButtonSelectedProps>`
    font-size: ${RFValue(9)}px;
    color: ${({theme}) => theme.colors.title};
    font-family: 'Manrope-Light';
    /* background-color: cyan; */
    
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
    
    ${({selected}) => selected && 
    css`
        color: ${({theme}) => theme.colors.primary} 
        font-family: 'Manrope-Bold';
    `};
    margin-bottom: 6px;
`;