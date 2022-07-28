import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import VideoPlayer from '../pages/VideoPlayer';
import { BottomTabRoutes } from './bottomTab.routes';

const { Navigator, Screen } = createStackNavigator();

import About from '../pages/About';
import ConnectionProblems from '../pages/ConnectionProblems';
import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';
import Support from '../pages/Support';
import Version from '../pages/Version';
import Scanner from '../pages/Scanner';
import Editor from '../pages/Editor';
import Processing from '../pages/Processing';

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="TabBarRoutes" component={BottomTabRoutes} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Support" component={Support} />
      <Screen name="About" component={About} />
      <Screen name="Version" component={Version} />
      <Screen name="EditProfile" component={EditProfile} />
      <Screen name="VideoPlayer" component={VideoPlayer} />
      <Screen name="ConnectionProblems" component={ConnectionProblems} />
      <Screen name="Scanner" component={Scanner} />
      <Screen name="Editor" component={Editor} />
      <Screen name="Processing" component={Processing} />

      {/* <Screen name="Deeplink" component={Deeplink} /> */}
    </Navigator>
  );
}
