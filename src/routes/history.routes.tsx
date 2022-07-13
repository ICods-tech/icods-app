import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../pages/History';
import QRCodeHistoryDetails from '../pages/QRCodeHistoryDetails';
import VideoPlayer from '../pages/VideoPlayer';

const { Navigator, Screen } = createStackNavigator();

export const DashboardRoutes = () => {
  return (
    <>
      <Screen name="History" component={History} />
      <Screen name="QRCodeHistoryDetails" component={QRCodeHistoryDetails} />
      <Screen
        name="VideoPlayer"
        component={VideoPlayer}
      // options={horizontalAnimation}
      />
    </>
  )
}