import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const Button = styled(BorderlessButton)`
    width: ${RFValue(60)}px;
    height: 100%; 
    margin-bottom: ${RFValue(34)}px;
    align-items: center;
`;

interface ButtonSelectedProps {
    selected?: boolean;
}

export const Title = styled.Text<ButtonSelectedProps>`
    font-size: ${RFValue(9)}px;

    color: ${({theme}) => theme.colors.title};
    font-family: 'Manrope-Light';
    
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
    
    ${({selected}) => selected && 
    css`
        color: ${({theme}) => theme.colors.primary} 
        font-family: 'Manrope-Bold';
    `};
`;