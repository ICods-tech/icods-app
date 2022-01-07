import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    height: ${RFValue(48)}px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.cloudly};
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(9)}px;

    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.light};
    
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;