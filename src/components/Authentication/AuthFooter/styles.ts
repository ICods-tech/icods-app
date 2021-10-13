import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    height: ${RFValue(48)}px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.cloudly};
    align-items: center;
    justify-content: center;
`;