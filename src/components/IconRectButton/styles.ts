import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const Button = styled(RectButton)`
    flex-direction: row;
    width: ${RFValue(266)}px;
    height: ${RFValue(36)}px;
    background-color: ${({theme}) => theme.colors.primary};

    align-items: center;
    justify-content: center;

    border-radius: 4px;
`;

export const IconContainer = styled.View`
    height: 100%;
    width: ${RFValue(16)}px;

    align-items: center;
    justify-content: center;

    margin-right: ${RFValue(5.5)}px;
`;
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape};
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
`;

