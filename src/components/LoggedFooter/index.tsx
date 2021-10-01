import React from 'react';
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';
import SocialIcon from '../../assets/images/Icons/footer/socialDark.svg';
import QrCodeScanIcon from '../../assets/images/Icons/footer/qrcode_scanSmall.svg';
import ActivatedHomeIcon from '../../assets/images/Icons/footer/activated-home.svg';
import DeactivatedHomeIcon from '../../assets/images/Icons/footer/deactivated-home.svg';
import ActivatedHistoryIcon from '../../assets/images/Icons/footer/activated-history.svg';
import DeactivatedHistoryIcon from '../../assets/images/Icons/footer/deactivated-history.svg';
import DeactivatedNotificationsIcon from '../../assets/images/Icons/footer/deactivated-bell.svg';
import ScannerImg from '../../assets/images/ícone-qr-code.svg';

import { 
  BorderTop,
  Container, 
  FooterButton, 
  FooterButtonTitle,
  ScannerButton, 
} from './newStyles';
import { RFValue } from 'react-native-responsive-fontsize';

interface LoggedFooterProps {
  isHistory?: boolean;
  isDashboard?: boolean;
  isScanner?: boolean;
}


export function LoggedFooter({
  isDashboard, 
  isHistory, 
  isScanner}: LoggedFooterProps){
  const navigation = useNavigation()
  return (
    <Container>
        <FooterButton
          onPress={() => navigation.navigate('Dashboard')}
          >

          <BorderTop
            selected={isDashboard!}
          />
          
          {isDashboard ?
            <ActivatedHomeIcon 
              width={RFValue(24)}
              height={RFValue(24)}
            /> :
            <DeactivatedHomeIcon 
              width={RFValue(24)}
              height={RFValue(24)}
            />
          }

          <FooterButtonTitle selected={isDashboard!}>Início</FooterButtonTitle>
        </FooterButton>

        <FooterButton
          onPress={() => navigation.navigate('History')}
        >
          <BorderTop
            selected={isHistory!}
          />
          {isHistory ?
          <ActivatedHistoryIcon 
            width={RFValue(24)}
            height={RFValue(24)}
          /> : 
          <DeactivatedHistoryIcon 
            width={RFValue(24)}
            height={RFValue(24)}
          />}
          
          <FooterButtonTitle selected={isHistory!}>Histórico</FooterButtonTitle>
        </FooterButton>

        <ScannerButton 
          onPress={ () => navigation.navigate( 'Scanner' )} 
        >
          <ScannerImg 
            width={RFValue(56)}
            height={RFValue(56)}
          />
          
          <FooterButtonTitle
            selected={isScanner!}
          >Escanear</FooterButtonTitle>
        </ScannerButton>
        
        <FooterButton>
          <BorderTop
            selected={false}
          />
          <DeactivatedNotificationsIcon 
            width={RFValue(24)}
            height={RFValue(24)}
          />
          <FooterButtonTitle>Notificação</FooterButtonTitle>
        </FooterButton>
        
        <FooterButton>
          <BorderTop
            selected={false}
          />
          <SocialIcon 
            width={RFValue(24)}
            height={RFValue(24)}
          />
          <FooterButtonTitle>Social</FooterButtonTitle>
        </FooterButton>
        
    </Container>
  )
}
