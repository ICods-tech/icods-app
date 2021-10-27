import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 0px ${RFValue(15)}px;
    background-color: ${({ theme }) => theme.colors.shape};
    /* background-color: red; */
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: ${RFValue(20)}px;
    background-color: ${({theme}) => theme.colors.shape};

`;

export const Title = styled.Text`
    font-size: ${RFValue(26)}px;

    font-family: ${({theme}) => theme.fonts.extra_bold};
    color: ${({theme}) => theme.colors.title};
    
    letter-spacing: ${Dimensions.get('window').width*0.001}px;
    
    margin-left: ${RFValue(17)}px;
    margin-bottom: 4px;
    /* background-color: ${({theme}) => theme.colors.dark}; */
`;

export const SearchContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: ${RFValue(26)}px;
    /* background-color: ${({theme}) => theme.colors.dark}; */
`;

export const OptionalButtonsContainer = styled.View`
    width: ${RFValue(80)}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;