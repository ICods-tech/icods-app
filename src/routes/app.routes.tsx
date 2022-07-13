import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import Scanner from '../pages/Scanner';
import Working from '../pages/Working';

import SocialActivatedIcon from '../assets/images/Icons/footer/activated-social.svg';
import SocialDeactivatedIcon from '../assets/images/Icons/footer/socialDark.svg';
import NotificationsDeactivatedIcon from '../assets/images/Icons/footer/deactivated-bell.svg';
import NotificationsActivatedIcon from '../assets/images/Icons/footer/activated-bell.svg';
import ActivatedHistoryIcon from '../assets/images/Icons/footer/activated-history.svg';
import DeactivatedHistoryIcon from '../assets/images/Icons/footer/deactivated-history.svg';
import ActivatedHomeIcon from '../assets/images/Icons/footer/activated-home.svg';
import DeactivatedHomeIcon from '../assets/images/Icons/footer/deactivated-home.svg';
import { ScannerButton } from '../components/ScannerButton';

const { Navigator, Screen } = createBottomTabNavigator();

interface StyleInterpolatorProps {
  current: any;
  layouts: any;
}

export const AppRoutes = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const cardStyleNoAnimationReturn = (current: any, layouts: any) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 0],
            outputRange: [-layouts.screen.width, 0],
          }),
        },
      ],
    },
  });

  const noAnimation = {
    cardStyleInterpolator: ({ current, layouts }: StyleInterpolatorProps) => {
      return cardStyleNoAnimationReturn(current, layouts);
    },
  };

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }: StyleInterpolatorProps) => {
      return cardStyleReturn(current, layouts, false);
    },
  };

  const cardStyleReturn = (
    current: any,
    layouts: any,
    isInverted: boolean,
  ) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: isInverted
              ? [-layouts.screen.width, 0]
              : [layouts.screen.width, 0],
          }),
        },
      ],
    },
  });

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: RFValue(47),
          backgroundColor: theme.colors.cloudly,
          // paddingTop: RFValue(12),
          paddingBottom: RFValue(5),
        },
      }}>
      <Screen
        name="Início"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ActivatedHomeIcon width={RFValue(24)} height={RFValue(24)} />
            ) : (
              <DeactivatedHomeIcon width={RFValue(24)} height={RFValue(24)} />
            ),
        }}
      />
      <Screen
        name="Histórico"
        component={History}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ActivatedHistoryIcon width={RFValue(24)} height={RFValue(24)} />
            ) : (
              <DeactivatedHistoryIcon
                width={RFValue(24)}
                height={RFValue(24)}
              />
            ),
        }}
      />
      <Screen
        name="Escanear"
        component={Scanner}
        options={{
          tabBarIcon: () => (
            <ScannerButton />)
        }}
      />


      <Screen
        name="Notificação"
        component={Working}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <NotificationsActivatedIcon
                width={RFValue(24)}
                height={RFValue(24)}
              />
            ) : (
              <NotificationsDeactivatedIcon
                width={RFValue(24)}
                height={RFValue(24)}
              />
            ),
        }}
      />
      <Screen
        name="Social"
        component={Working}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SocialActivatedIcon width={RFValue(24)} height={RFValue(24)} />
            ) : (
              <SocialDeactivatedIcon width={RFValue(24)} height={RFValue(24)} />
            ),
        }}
      />
    </Navigator> //
  );
};
