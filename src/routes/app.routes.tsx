import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import VideoPlayer from '../pages/VideoPlayer';
import { BottomTabRoutes } from './bottomTab.routes';

const { Navigator, Screen } = createStackNavigator();

import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Deeplink from '../pages/Deeplink';
import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';
import Support from '../pages/Support';
import Version from '../pages/Version';

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Deeplink" component={Deeplink} />
      <Screen name="TabBarRoutes" component={BottomTabRoutes} />
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Support" component={Support} />
      <Screen name="About" component={About} />
      <Screen name="EditProfile" component={EditProfile} />
      <Screen name="Version" component={Version} />
      <Screen name="VideoPlayer" component={VideoPlayer} />
    </Navigator>
  );
}
