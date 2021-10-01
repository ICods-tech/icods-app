import { Dimensions } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.background};
    
    height: ${RFValue(48)}px;
    width: 100%;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
`;

export const FooterButton = styled(RectButton)`
    height: 100%;
    width: ${RFValue(70)}px;
    align-items: center;
    justify-content: space-between;
`;

interface ButtonSelectedProps {
    selected?: boolean;
}

export const BorderTop = styled.View<ButtonSelectedProps>`
    height: ${RFValue(2)}px;
    width: ${RFValue(24)}px;
    background-color: ${({theme, selected}) => selected ? theme.colors.primary : theme.colors.background};    
`;

export const FooterButtonTitle = styled.Text<ButtonSelectedProps>`
    font-size: ${RFValue(8)}px;
    font-weight: 800;
    letter-spacing: ${Dimensions.get('window').width*0.004}px;
    color: ${({theme, selected}) => selected ? theme.colors.primary : theme.colors.title};
`;

export const ScannerButton = styled(BorderlessButton).attrs({
    activeOpacity: 1,
})`
    height: ${RFValue(56)}px;
    width: ${RFValue(56)}px;
    border-radius: ${RFValue(28)}px;
    margin-top: -${RFValue(36)}px;
    
    margin-left:${RFValue(2)}px;
    margin-right:${RFValue(2)}px;
    
    background-color: ${({theme}) => theme.colors.primary};
    
    align-items: center;
    justify-content: space-between;
`;