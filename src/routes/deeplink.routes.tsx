import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ForgotPassword } from '../pages/ForgotPassword';
import RedefinePassword from '../pages/RedefinePassword';
import Deeplink from '../pages/Deeplink';

const { Navigator, Screen } = createBottomTabNavigator();

export const DeeplinkRoutes = () => {
  return (
    <Navigator>
      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
      // options={horizontalAnimation}
      />
      <Screen
        name="RedefinePassword"
        component={RedefinePassword}
      // options={invertedHorizontalAnimation}
      />
      <Screen
        name="Deeplink"
        component={Deeplink}
      // options={horizontalAnimation}
      />
    </Navigator>
  )
}