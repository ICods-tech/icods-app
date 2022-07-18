import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import { RouteButton } from '../components/atoms/RouteButton';
import { ScannerButton } from '../components/atoms/ScannerButton';

import { HistoryRoutes } from './history.routes';
import Scanner from '../pages/Scanner';
import Working from '../pages/Working';
import Dashboard from '../pages/Dashboard';


const { Navigator, Screen } = createBottomTabNavigator();

export function BottomTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={({ route }) => {
        return ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: RFValue(56),
            backgroundColor: theme.colors.light_500,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.dark_800,
          tabBarIcon: ({ focused }) =>
            <RouteButton
              isActivated={focused}
              title={route.name}
            />
        })
      }}
    >
      <Screen name="Início" component={Dashboard} />
      <Screen name="Histórico" component={HistoryRoutes} />
      <Screen
        name="Escanear"
        component={Scanner}
        options={{
          tabBarIcon: ({ focused }) => <ScannerButton isActivated={focused} />,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Screen name="Notificação" component={Working} />
      <Screen name="Social" component={Working} />
    </Navigator >
  );
}