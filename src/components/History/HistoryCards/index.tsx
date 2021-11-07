'use strict';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import RedFlag from '../../../assets/images/red_flag.svg';
import GreenFlag from '../../../assets/images/green_flag.svg';
import ArrowIcon from '../../../assets/images/Icons/arrow_icon.svg';
import NoColorMarker from '../../../assets/images/Icons/cardMarker/NoColor.svg'
import HeartIcon from '../../../assets/images/Icons/heart_icon.svg';
import QrCodeImg from '../../../assets/images/qr_code.svg';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import { 
  BlackMarker,
  BlueMarker, 
  Button, 
  Content, 
  CyanMarker, 
  GreenMarker, 
  PinkMarker, 
  RedMarker, 
  YellowMarker
} from './newStyles';

import { RectButtonProperties } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface HistoryCardsProps extends RectButtonProperties{
  id: string;
  creator: string;
  color: Colors;
  date: string;
  favorite: boolean;
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


const HistoryCards = ({ 
  id, 
  creator, 
  date, 
  color, 
  favorite,
  ...rest
}: HistoryCardsProps) => 
{
  const navigation = useNavigation()
  return (
    <>
      <Button 
        onPress={
          () => navigation.navigate('QRCodeHistoryDetails', 
          { id, color, creator, favorite })}
        color={color}
        {...rest}
        >
          {( color in CardColors && 
          (color !== 'noFilter' && color !== 'noColor'))
          && CardMarker[color]}

          <Content>
            <QrCodeImg width={RFValue(82)} height={RFValue(82)}/>

            <View style={styles.qrCodeInfo}>
              <Text style={styles.textQRCodeInfo}>Código: {id.substr(id.length - 8)}</Text>
              <Text style={styles.textQRCodeInfo}>Conteúdo: <Text style={styles.privacyInfo}>Público</Text></Text>
              <Text style={styles.textQRCodeInfo}>Feito por: {creator}</Text>
              <Text style={styles.textQRCodeInfo}>Data: {date}</Text>
            </View>

            <View style={styles.rightQRCodeInfoButtons}>
              {favorite && (<HeartIcon />)}
              <ArrowIcon />
            </View>
          </Content>
      </Button>
    </>
  )
}

export default HistoryCards;