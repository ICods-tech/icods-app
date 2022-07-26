import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import History from '../pages/History';
import QRCodeHistoryDetails from '../pages/QRCodeHistoryDetails';

const { Navigator, Screen } = createStackNavigator();

export const HistoryRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="History" component={History} />
      <Screen name="QRCodeHistoryDetails" component={QRCodeHistoryDetails} />
    </Navigator>
  )
}