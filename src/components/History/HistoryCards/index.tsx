'use strict';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import QrCodeImg from '../../../assets/images/qr_code.svg';

import { useNavigation } from '@react-navigation/native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { 
  BlackMarker,
  BlueMarker, 
  Button, 
  Container, 
  Content, 
  CyanMarker, 
  Favorited, 
  GreenMarker, 
  MainContainer, 
  OptionsButton, 
  OptionsButtonIcon, 
  PinkMarker, 
  QRCodeCardOptions, 
  QRCodeInfo, 
  QRCodeInfoPrivacy, 
  QRCodeInfoText,
  QRCodePrivacyText, 
  RedMarker, 
  YellowMarker
} from './styles';

interface HistoryCardsProps extends RectButtonProperties{
  id: string;
  creator: string;
  color: Colors;
  date: string;
  favorite: boolean;
  link: string;
  privacy: "Público" | "Privado";
}

const CardMarker = {
  'black': <BlackMarker />,
  'blue': <BlueMarker />,
  'cyan': <CyanMarker />,
  'green': <GreenMarker />,
  'pink': <PinkMarker />,
  'red': <RedMarker />,
  'yellow': <YellowMarker />,
}

export const CardColors = {
  'red': '#ff6d6d',
  'green': '#6dff73',
  'blue': '#2b90d9',
  'yellow': '#ffb600',
  'cyan': '#68f6ff',
  'pink': '#ff68c3',
  'black': '#000'
} 


export function HistoryCards({ 
  id, 
  creator, 
  date, 
  color, 
  favorite,
  privacy,
  link,
  ...rest
}: HistoryCardsProps)
{
  const navigation = useNavigation()
  return (
    <Button
      onPress={
        () => navigation.navigate('QRCodeHistoryDetails', { id, color, creator, favorite, link })}
        {...rest}
        >
          <Container color={color}>
            {( color in CardColors && 
            (color !== 'noFilter' && color !== 'noColor'))
            && CardMarker[color]}

            <Content>
              <QrCodeImg width={RFValue(82)} height={RFValue(82)}/>
              <MainContainer>
              <QRCodeInfo>
                <QRCodeInfoText>Código: {id.substr(id.length - 8)}</QRCodeInfoText>
                <QRCodeInfoPrivacy>
                  <QRCodeInfoText>Conteúdo: </QRCodeInfoText> 
                  <QRCodePrivacyText >{privacy}</QRCodePrivacyText>
                </QRCodeInfoPrivacy>
                <QRCodeInfoText>Feito por: {creator}</QRCodeInfoText>
                <QRCodeInfoText>Data: {date}</QRCodeInfoText>
              </QRCodeInfo>

              <QRCodeCardOptions>
                <OptionsButton>
                  <OptionsButtonIcon />
                </OptionsButton>
              </QRCodeCardOptions>
              </MainContainer>
            </Content>


          {favorite && (<Favorited />)}
          </Container>
      </Button>
  )
}