'use strict';
import React from 'react';
import QrCodeImg from '../../../assets/images/qr_code.svg';

import {RectButtonProps} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

import {StyleSheet} from 'react-native';
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
  YellowMarker,
} from './styles';
import {Colors} from '../../../@types/interfaces';

interface HistoryCardsProps extends RectButtonProps {
  id: string;
  creator: string;
  color: Colors;
  date: string;
  favorite: boolean;
  pressed: () => void;
  link: string;
  privacy: 'Público' | 'Privado';
}

const CardMarker = {
  black: <BlackMarker />,
  blue: <BlueMarker />,
  cyan: <CyanMarker />,
  green: <GreenMarker />,
  pink: <PinkMarker />,
  red: <RedMarker />,
  yellow: <YellowMarker />,
};

export const CardColors = {
  red: '#ff6d6d',
  green: '#6dff73',
  blue: '#0099FF',
  yellow: '#ffb600',
  cyan: '#68f6ff',
  pink: '#ff68c3',
  black: '#000',
};

export function HistoryCards({
  id,
  creator,
  date,
  color,
  pressed,
  favorite,
  privacy,
  ...rest
}: HistoryCardsProps) {
  type colorType = keyof typeof CardMarker;
  return (
    <Button onPress={pressed} {...rest} style={styles.ShadowButton}>
      <Container color={color}>
        {color in CardColors && CardMarker[color as colorType]}
        <Content>
          <QrCodeImg width={RFValue(82)} height={RFValue(82)} />
          <MainContainer>
            <QRCodeInfo>
              <QRCodeInfoText>
                Código: {id.substr(id.length - 8)}
              </QRCodeInfoText>
              <QRCodeInfoPrivacy>
                <QRCodeInfoText>Conteúdo: </QRCodeInfoText>
                <QRCodePrivacyText>{privacy}</QRCodePrivacyText>
              </QRCodeInfoPrivacy>
              <QRCodeInfoText>Feito por: {creator}</QRCodeInfoText>
              <QRCodeInfoText>Data: {date}</QRCodeInfoText>
            </QRCodeInfo>
            <QRCodeCardOptions>
              <OptionsButton  onPress={pressed}>
                <OptionsButtonIcon />
              </OptionsButton>
            </QRCodeCardOptions>
          </MainContainer>
        </Content>
        {favorite && <Favorited />}
      </Container>
    </Button>
  );
}

const styles = StyleSheet.create({
  ShadowButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: '#fff',
    elevation: 3,
  },
});
