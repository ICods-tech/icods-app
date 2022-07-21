import analytics from '@react-native-firebase/analytics';
import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';
import { linking } from '../linking';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();
  const routeNameRef = useRef();
  const navigationRef = useRef() as any;
  return (
    <NavigationContainer
      ref={navigationRef as any}
      linking={linking}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
