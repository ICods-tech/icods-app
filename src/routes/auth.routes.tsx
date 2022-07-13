import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from "styled-components/native";
import ConnectionProblems from '../pages/ConnectionProblems';
import { ForgotPassword } from '../pages/ForgotPassword';
import RedefinePassword from '../pages/RedefinePassword';
import Register from '../pages/Register';
import Scanner from '../pages/Scanner';
import SignIn from '../pages/SignIn';
const { Navigator, Screen } = createStackNavigator();

interface StyleInterpolatorProps {
  current: any;
  layouts: any;
}

export const AuthRoutes = () => {


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

  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="Register"
        component={Register}
      // options={horizontalAnimation}
      />
      <Screen
        name="Scanner"
        component={Scanner}
        options={(props: {
          route: RouteProp<Record<string, object | undefined>, "Scanner">;
          navigation: any;
        }) =>
          props.route.key === "SCANNER_FROM_FOOTER"
            ? noAnimation
            : noAnimation
        }
      />
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
        name="ConnectionProblems"
        component={ConnectionProblems}
      // options={horizontalAnimation}
      />
    </Navigator>
  )
}
