import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const Button = styled(RectButton)`
    width: 100%;
    height: ${RFValue(36)}px;

    background-color: ${({theme}) => theme.colors.primary};
    border-radius: 116px;

    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.bold};

    color: #fff;
    letter-spacing: ${Dimensions.get('window').width*0.001}px;
`;