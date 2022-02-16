import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Props {
    isKeyboardVisible: boolean;
}

const backButtonMarginTop = RFValue(21) + getStatusBarHeight();

export const ScrollRegister = styled.ScrollView.attrs(
    {
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
            flexGrow: 1,
        },
    }
)`
`;

export const BackButtonContainer = styled.View<Props>`
    position: absolute;
    top: ${({isKeyboardVisible}) => isKeyboardVisible ?  RFValue(21) +  backButtonMarginTop : backButtonMarginTop }px;
    left: ${RFValue(16)}px;
    
`;

export const Form = styled.View<Props>`
    width: 100%;
    padding: 0 ${RFValue(55)}px;
    margin-top: ${({isKeyboardVisible}) => isKeyboardVisible ? RFValue(70) : RFValue(35)}px;
`;

export const RegisterTitle = styled.Text`
    text-align: center;
    font-size: ${RFValue(16)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: ${RFValue(17)}px;
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
    color: ${({theme}) => theme.colors.title};
    `;

interface ErrorStyleProps {
    isErrored: boolean;
}

export const InputContainer = styled.View<ErrorStyleProps>`
    border: 1px solid ${({isErrored, theme }) => isErrored ? theme.colors.attention : theme.colors.light_line};
    border-radius: 4px;
    `;

export const SubmitButtonContainer = styled.View`
    margin-top: ${RFValue(39)}px;
    `;