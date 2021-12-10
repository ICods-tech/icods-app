import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
`;

export const BackButtonContainer = styled.View`
    position: absolute;
    top: ${RFValue(21)}px;
    left: ${RFValue(16)}px;

`;

export const RegisterForm = styled.ScrollView.attrs(
    {
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,

    }
)`
    width: 100%;
    padding: 0 ${RFValue(55)}px;
`;

export const RegisterTitle = styled.Text`
    text-align: center;
    font-size: ${RFValue(16)}px;
    font-family: ${({theme}) => theme.fonts.regular};

    margin-bottom: ${RFValue(17)}px;
    margin-top: ${RFValue(35)}px;
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