import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Button = styled(BorderlessButton)`
    height: ${RFValue(32)}px;
    width: ${RFValue(32)}px;
`;

export const ShareItemContainer = styled.View`
    display: flex; 
    align-items: center;
    justify-content: center;
    width: ${RFValue(32)}px;
    height: ${RFValue(32)}px;
    border-radius: ${RFValue(16)}px;
    background: #fff;
    shadow-color: black;
    shadow-opacity: 1;
    shadow-radius: 32px;
    elevation: 6;
`