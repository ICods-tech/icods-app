import styled from 'styled-components/native';
import BlackMarkerIcon from '../../../assets/images/Icons/cardMarker/Black.svg'
import BlueMarkerIcon from '../../../assets/images/Icons/cardMarker/Blue.svg'
import CyanMarkerIcon from '../../../assets/images/Icons/cardMarker/Cyan.svg'
import GreenMarkerIcon from '../../../assets/images/Icons/cardMarker/Green.svg'
import PinkMarkerIcon from '../../../assets/images/Icons/cardMarker/Pink.svg'
import RedMarkerIcon from '../../../assets/images/Icons/cardMarker/Red.svg'
import YellowMarkerIcon from '../../../assets/images/Icons/cardMarker/Yellow.svg'

import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContentProps{
    color: Colors;
}

export const Button = styled(RectButton)<ContentProps>`
    flex-direction: row;
   
    height: ${RFValue(128)}px;
    width: 100%;
   
    padding-left: ${({color}) => 
    (color !== 'noColor' && color !== 'noFilter') 
    ? 0 : RFValue(10)}px;

    background-color: ${({ theme }) => theme.colors.shape};
    align-items: center;
    justify-content: space-between;
`;



export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: ${RFValue(11)}px;
`; 

// Color Makers
export const BlackMarker = styled(BlackMarkerIcon).attrs({
    width: RFValue(10),
    height: RFValue(114),
})``;

export const BlueMarker = styled(BlueMarkerIcon).attrs({
    width: RFValue(10),
    height: RFValue(114),
})``;

export const CyanMarker = styled(CyanMarkerIcon).attrs({
    width: RFValue(10),
    height: RFValue(114),
})``;

export const GreenMarker = styled(GreenMarkerIcon).attrs({
    width: RFValue(10),
    height: RFValue(114),
})``;

export const PinkMarker = styled(PinkMarkerIcon).attrs({
    width: RFValue(10),
    height: RFValue(114),
})``;

export const RedMarker = styled(RedMarkerIcon).attrs({
    width: RFValue(10),
    height: RFValue(114),
})``;

export const YellowMarker = styled(YellowMarkerIcon).attrs({
    width: RFValue(10),
    height: RFValue(114),
})``;
