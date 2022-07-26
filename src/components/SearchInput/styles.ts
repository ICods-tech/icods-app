import styled from 'styled-components/native';
import Search from '../../assets/images/Icons/search.svg';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, TextInput } from 'react-native';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;

    height: ${RFValue(47)}px;
    /* width: ${RFValue(240)}px; */
    width: ${Dimensions.get('window').width * 0.6}px;
    border-radius: ${RFValue(8)}px;
    background-color: ${({ theme }) => theme.colors.light_500};
`;

export const IconButton = styled(BorderlessButton)`
    height: 100%;
    padding: 0 ${RFValue(12)}px;
    
    align-items: center;
    justify-content: center;
`;

export const Input = styled(TextInput)`
    flex: 1;
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    letter-spacing: ${Dimensions.get('window').width * 0.002}px;

    padding-right: ${RFValue(12)}px;
`;

export const SearchIcon = styled(Search).attrs({
    width: RFValue(16),
    height: RFValue(16),
})``;