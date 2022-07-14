import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import Scanner from '../pages/Scanner';
import Working from '../pages/Working';

import NotificationsActivatedIcon from '../assets/images/Icons/footer/activated-bell.svg';
import ActivatedHistoryIcon from '../assets/images/Icons/footer/activated-history.svg';
import ActivatedHomeIcon from '../assets/images/Icons/footer/activated-home.svg';
import SocialActivatedIcon from '../assets/images/Icons/footer/activated-social.svg';
import NotificationsDeactivatedIcon from '../assets/images/Icons/footer/deactivated-bell.svg';
import DeactivatedHistoryIcon from '../assets/images/Icons/footer/deactivated-history.svg';
import DeactivatedHomeIcon from '../assets/images/Icons/footer/deactivated-home.svg';
import SocialDeactivatedIcon from '../assets/images/Icons/footer/socialDark.svg';
import BorderMenu from '../components/BorderMenu';
import { ScannerButton } from '../components/ScannerButton';
import { DashboardRoutes } from './dashboard.routes';

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
        component={DashboardRoutes}
        options={{
          tabBarIcon: ({ focused }) => (
            <BorderMenu
              selected={focused}
              activatedIcon={ActivatedHomeIcon}
              deactivatedIcon={DeactivatedHomeIcon}
            />
          ),
        }}
      />
      <Screen
        name="Histórico"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <BorderMenu
                selected={focused}
                activatedIcon={ActivatedHistoryIcon}
                deactivatedIcon={DeactivatedHistoryIcon}
              />
            );
          },
        }}
      />
      <Screen
        name="Escanear"
        component={Scanner}
        options={{
          tabBarIcon: () => <ScannerButton />,
        }}
      />

      <Screen
        name="Notificação"
        component={Working}
        options={{
          tabBarIcon: ({ focused }) => (
            <BorderMenu
              selected={focused}
              activatedIcon={NotificationsActivatedIcon}
              deactivatedIcon={NotificationsDeactivatedIcon}
            />
          ),
        }}
      />
      <Screen
        name="Social"
        component={Working}
        options={{
          tabBarIcon: ({ focused }) => (
            <BorderMenu
              selected={focused}
              activatedIcon={SocialActivatedIcon}
              deactivatedIcon={SocialDeactivatedIcon}
            />
          ),
        }}
      />
    </Navigator>
  );
};
