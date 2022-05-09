import { RouteProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAuth } from '../hooks/auth';
import About from '../pages/About';
import ConnectionProblems from '../pages/ConnectionProblems';
import Dashboard from '../pages/Dashboard';
import Deeplink from '../pages/Deeplink';
import Editor from '../pages/Editor';
import EditProfile from '../pages/EditProfile';
import { ForgotPassword } from '../pages/ForgotPassword';
import GiftOpen from '../pages/GiftOpen';
import History from '../pages/History';
import Processing from '../pages/Processing';
import ProcessingICodsCircleProgress from '../pages/ProcessingICodsCircleProgress';
import Profile from '../pages/Profile';
import QRCodeHistoryDetails from '../pages/QRCodeHistoryDetails';
import RedefinePassword from '../pages/RedefinePassword';
import Register from '../pages/Register';
import Scanner from '../pages/Scanner';
import SignIn from '../pages/SignIn';
import Splash from '../pages/Splash';
import Support from '../pages/Support';
import Version from '../pages/Version';
import VideoPlayer from '../pages/VideoPlayer';
import Working from '../pages/Working';

const App = createStackNavigator();

interface StyleInterpolatorProps {
  current: any;
  layouts: any;
}

const invertedHorizontalAnimation = {
  cardStyleInterpolator: ({current, layouts}: StyleInterpolatorProps) => {
    return cardStyleReturn(current, layouts, true);
  },
};

const cardStyleReturn = (current: any, layouts: any, isInverted: boolean) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: isInverted
            ? [-layouts.screen.width, 0]
            : [layouts.screen.width, 0],
        }),
      },
    ],
  },
});

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

const horizontalAnimation = {
  cardStyleInterpolator: ({current, layouts}: StyleInterpolatorProps) => {
    return cardStyleReturn(current, layouts, false);
  },
};

const noAnimation = {
  cardStyleInterpolator: ({current, layouts}: StyleInterpolatorProps) => {
    return cardStyleNoAnimationReturn(current, layouts);
  },
};

interface IProp {
  deeplink: string;
}

const Routes = ({deeplink}: IProp) => {
  const navigation = useNavigation<any>();
  if (deeplink.length) {
    navigation.navigate('Deeplink', {url: deeplink});
  }

  const {user, token, isLoading} = useAuth();
  const theme = useTheme();
  return (
    <App.Navigator
      mode="card"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: theme.colors.shape},
      }}>
      {isLoading ? (
        <App.Screen
          name="Splash"
          component={Splash}
          options={horizontalAnimation}
        />
      ) : user ? (
        <>
          <App.Screen
            name="Dashboard"
            component={Dashboard}
            options={(props: {
              route: RouteProp<Record<string, object | undefined>, 'Dashboard'>;
              navigation: any;
            }) =>
              props.route.key === 'DASHBOARD_FROM_FOOTER'
                ? noAnimation
                : horizontalAnimation
            }
          />
          <App.Screen
            name="Deeplink"
            component={Deeplink}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Profile"
            component={Profile}
            options={horizontalAnimation}
          />
          <App.Screen
            name="EditProfile"
            component={EditProfile}
            options={horizontalAnimation}
          />
          <App.Screen
            name="History"
            component={History}
            options={(props: {
              route: RouteProp<Record<string, object | undefined>, 'History'>;
              navigation: any;
            }) =>
              props.route.key === 'HISTORY_FROM_FOOTER'
                ? noAnimation
                : horizontalAnimation
            }
          />
          <App.Screen
            name="QRCodeHistoryDetails"
            component={QRCodeHistoryDetails}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Support"
            component={Support}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Editor"
            component={Editor}
            options={horizontalAnimation}
          />
          <App.Screen
            name="About"
            component={About}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Version"
            component={Version}
            options={horizontalAnimation}
          />
          <App.Screen
            name="ProcessingICodsCircleProgress"
            component={ProcessingICodsCircleProgress}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Scanner"
            component={Scanner}
            options={(props: {
              route: RouteProp<Record<string, object | undefined>, 'Scanner'>;
              navigation: any;
            }) =>
              props.route.key === 'SCANNER_FROM_FOOTER'
                ? noAnimation
                : horizontalAnimation
            }
          />
          <App.Screen
            name="VideoPlayer"
            component={VideoPlayer}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Processing"
            component={Processing}
            options={horizontalAnimation}
          />
          <App.Screen
            name="ConnectionProblems"
            component={ConnectionProblems}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Working"
            component={Working}
            options={(props: {
              route: RouteProp<Record<string, object | undefined>, 'Working'>;
              navigation: any;
            }) =>
              props.route.key === 'WORKING_FROM_FOOTER'
                ? noAnimation
                : horizontalAnimation
            }
          />
        </>
      ) : (
        <>
          <App.Screen
            name="SignIn"
            component={SignIn}
            options={invertedHorizontalAnimation}
          />
          <App.Screen
            name="Register"
            component={Register}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Deeplink"
            component={Deeplink}
            options={horizontalAnimation}
          />
          <App.Screen
            name="Scanner"
            component={Scanner}
            options={(props: {
              route: RouteProp<Record<string, object | undefined>, 'Scanner'>;
              navigation: any;
            }) =>
              props.route.key === 'SCANNER_FROM_FOOTER'
                ? noAnimation
                : horizontalAnimation
            }
          />
          <App.Screen
            name="VideoPlayer"
            component={VideoPlayer}
            options={horizontalAnimation}
          />
          <App.Screen
            name="GiftOpen"
            component={GiftOpen}
            options={horizontalAnimation}
          />
          <App.Screen
            name="ConnectionProblems"
            component={ConnectionProblems}
            options={horizontalAnimation}
          />
          <App.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={horizontalAnimation}
          />
          <App.Screen
            name="RedefinePassword"
            component={RedefinePassword}
            options={invertedHorizontalAnimation}
          />
        </>
      )}
    </App.Navigator>
  );
};

export default Routes;
