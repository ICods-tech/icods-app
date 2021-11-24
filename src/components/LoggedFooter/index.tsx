import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import DeactivatedSocialIcon from '../../assets/images/Icons/footer/socialDark.svg';
import ActivatedHomeIcon from '../../assets/images/Icons/footer/activated-home.svg';
import DeactivatedHomeIcon from '../../assets/images/Icons/footer/deactivated-home.svg';
import ActivatedHistoryIcon from '../../assets/images/Icons/footer/activated-history.svg';
import DeactivatedHistoryIcon from '../../assets/images/Icons/footer/deactivated-history.svg';
import DeactivatedNotificationsIcon from '../../assets/images/Icons/footer/deactivated-bell.svg';
import ActivatedNotificationsIcon from '../../assets/images/Icons/footer/activated-bell.svg';
import ActivatedSocialIcon from '../../assets/images/Icons/footer/activated-social.svg';
import ScannerImg from '../../assets/images/ícone-qr-code.svg';

import { 
  BorderTop,
  Container, 
  FooterButton, 
  FooterButtonTitle,
  // ScannerButton, 
} from './styles';
import { ScannerButton } from '../ScannerButton';

interface LoggedFooterProps {
  isHistory?: boolean;
  isDashboard?: boolean;
  isScanner?: boolean;
  isNotification?: boolean;
  isSocial?: boolean;
}


export default function LoggedFooter({
  isDashboard, 
  isHistory, 
  isScanner,
  isNotification,
  isSocial
}: LoggedFooterProps) {
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
          selected={isScanner}
        />
        
        <FooterButton
          onPress={ () => navigation.navigate( 'Working', { type: 'Notification' } )}
        >
          <BorderTop
            selected={isNotification!}
          />
        {isNotification! ? 
          (<ActivatedNotificationsIcon 
            width={RFValue(24)}
            height={RFValue(24)}
          />)
          : (<DeactivatedNotificationsIcon 
            width={RFValue(24)}
            height={RFValue(24)}
          />)}
          <FooterButtonTitle selected={isNotification!}>Notificação</FooterButtonTitle>
        </FooterButton>
        
        <FooterButton
          onPress={ () => navigation.navigate( 'Working', { type: 'Social' } )}
        >
          <BorderTop
            selected={isSocial!}
          />
        {isSocial! ?
          (<ActivatedSocialIcon 
            width={RFValue(24)}
            height={RFValue(24)}
          />)
          : (<DeactivatedSocialIcon 
              width={RFValue(24)}
              height={RFValue(24)}
          />)}
          <FooterButtonTitle selected={isSocial!}>Social</FooterButtonTitle>
        </FooterButton>
        
    </Container>
  )
}
