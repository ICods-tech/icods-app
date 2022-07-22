import styled from 'styled-components/native';
import ArrowIcon from '../../../assets/images/Icons/arrow_icon.svg';
import BlackMarkerIcon from '../../../assets/images/Icons/cardMarker/Black.svg';
import BlueMarkerIcon from '../../../assets/images/Icons/cardMarker/Blue.svg';
import CyanMarkerIcon from '../../../assets/images/Icons/cardMarker/Cyan.svg';
import GreenMarkerIcon from '../../../assets/images/Icons/cardMarker/Green.svg';
import HeartIcon from '../../../assets/images/Icons/heart_icon.svg';
import UnFavorite from '../../../assets/images/Icons/unFavorite.svg';

import PinkMarkerIcon from '../../../assets/images/Icons/cardMarker/Pink.svg';
import RedMarkerIcon from '../../../assets/images/Icons/cardMarker/Red.svg';
import YellowMarkerIcon from '../../../assets/images/Icons/cardMarker/Yellow.svg';

import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
import {Colors} from '../../../@types/interfaces';

interface ContentProps {
  color: Colors;
}

export const Button = styled(RectButton)`
  height: ${RFValue(128)}px;
  width: 98%;
  align-self: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Container = styled.View<ContentProps>`
  flex-direction: row;

  width: 100%;

  padding-left: ${({color}) =>
    color !== 'noColor' && color !== 'noFilter' ? 0 : RFValue(10)}px;

  align-items: center;
  /* background-color: green; */
`;

export const Content = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  margin-left: ${RFValue(11)}px;
  /* background-color: red; */
`;

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* background-color: cyan; */
`;

export const QRCodeInfo = styled.View`
  margin-left: ${RFValue(16)}px;
`;

export const QRCodeInfoText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.dark_800};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const QRCodeInfoPrivacy = styled.View`
  flex-direction: row;
`;

export const QRCodePrivacyText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.primary};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const QRCodeCardOptions = styled.View``;

export const Favorited = styled(HeartIcon).attrs({
  width: RFValue(16),
  height: RFValue(16),
})`
  position: absolute;
  top: ${RFValue(6)}px;
  right: ${RFValue(22)}px;
`;

export const UnFavorited = styled(UnFavorite).attrs({
  width: RFValue(16),
  height: RFValue(16),
})`
  position: absolute;
  top: ${RFValue(6)}px;
  right: ${RFValue(22)}px;
`;

export const OptionsButton = styled(BorderlessButton)`
  height: ${RFValue(36)}px;
  width: ${RFValue(36)}px;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
`;

export const OptionsButtonIcon = styled(ArrowIcon).attrs({
  width: RFValue(16),
  height: RFValue(16),
})``;

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
