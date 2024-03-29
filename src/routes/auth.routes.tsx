import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ForgotPassword} from '../pages/ForgotPassword';
import ConnectionProblems from '../pages/ConnectionProblems';
import RedefinePassword from '../pages/RedefinePassword';
import Register from '../pages/Register';
import Scanner from '../pages/Scanner';
import SignIn from '../pages/SignIn';
import Deeplink from '../pages/Deeplink';
import VideoPlayer from '../pages/VideoPlayer';
import GiftOpen from '../pages/GiftOpen';
const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Register" component={Register} />
      <Screen name="Scanner" component={Scanner} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="RedefinePassword" component={RedefinePassword} />
      <Screen name="ConnectionProblems" component={ConnectionProblems} />
      <Screen name="VideoPlayer" component={VideoPlayer} />
      <Screen name="GiftOpen" component={GiftOpen} />
      <Screen name="Deeplink" component={Deeplink} />
    </Navigator>
  );
}
