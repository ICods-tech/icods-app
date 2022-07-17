import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import NotificationsActivatedIcon from '../assets/images/Icons/footer/activated-bell.svg';
import ActivatedHistoryIcon from '../assets/images/Icons/footer/activated-history.svg';
import ActivatedHomeIcon from '../assets/images/Icons/footer/activated-home.svg';
import SocialActivatedIcon from '../assets/images/Icons/footer/activated-social.svg';
import NotificationsDeactivatedIcon from '../assets/images/Icons/footer/deactivated-bell.svg';
import DeactivatedHistoryIcon from '../assets/images/Icons/footer/deactivated-history.svg';
import DeactivatedHomeIcon from '../assets/images/Icons/footer/deactivated-home.svg';
import SocialDeactivatedIcon from '../assets/images/Icons/footer/socialDark.svg';

import { RouteTitle } from '../components/atoms/RouteTitle';
import { RouteButton } from '../components/atoms/RouteButton';


import { DashboardRoutes } from './dashboard.routes';
import { HistoryRoutes } from './history.routes';
import Scanner from '../pages/Scanner';
import Working from '../pages/Working';
import { ScannerButton } from '../components/atoms/ScannerButton';


const { Navigator, Screen } = createBottomTabNavigator();

// interface StyleInterpolatorProps {
//   current: any;
//   layouts: any;
// }

export const AppRoutes = () => {
  const theme = useTheme();
  // const navigation = useNavigation<any>();
  // const cardStyleNoAnimationReturn = (current: any, layouts: any) => ({
  //   cardStyle: {
  //     transform: [
  //       {
  //         translateX: current.progress.interpolate({
  //           inputRange: [0, 0],
  //           outputRange: [-layouts.screen.width, 0],
  //         }),
  //       },
  //     ],
  //   },
  // });

  // const noAnimation = {
  //   cardStyleInterpolator: ({ current, layouts }: StyleInterpolatorProps) => {
  //     return cardStyleNoAnimationReturn(current, layouts);
  //   },
  // };

  // const horizontalAnimation = {
  //   cardStyleInterpolator: ({ current, layouts }: StyleInterpolatorProps) => {
  //     return cardStyleReturn(current, layouts, false);
  //   },
  // };

  // const cardStyleReturn = (
  //   current: any,
  //   layouts: any,
  //   isInverted: boolean,
  // ) => ({
  //   cardStyle: {
  //     transform: [
  //       {
  //         translateX: current.progress.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: isInverted
  //             ? [-layouts.screen.width, 0]
  //             : [layouts.screen.width, 0],
  //         }),
  //       },
  //     ],
  //   },
  // });

  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: RFValue(56),
          backgroundColor: theme.colors.light_500,
          paddingBottom: 5,
        },

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.dark_800,

        tabBarLabel: ({ focused }) => <RouteTitle title={route.name} isActivated={focused} />
      })}
    >
      <Screen
        name="Início"
        component={DashboardRoutes}
        options={{
          tabBarIcon: ({ focused }) => (
            <RouteButton
              selected={focused}
              activatedIcon={ActivatedHomeIcon}
              deactivatedIcon={DeactivatedHomeIcon}
            />
          ),
        }}
      />
      <Screen
        name="Histórico"
        component={HistoryRoutes}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <RouteButton
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
            <RouteButton
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
            <RouteButton
              selected={focused}
              activatedIcon={SocialActivatedIcon}
              deactivatedIcon={SocialDeactivatedIcon}
            />
          ),
        }}
      />
    </Navigator >
  );
};