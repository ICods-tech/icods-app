import React, { useState, useEffect } from 'react'
import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import Register from '../pages/Register';
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'
import Splash from '../pages/Splash'
import { useAuth } from '../hooks/auth'
import History from '../pages/History';
import Support from '../pages/Support'
import QRCodeHistoryDetails from '../pages/QRCodeHistoryDetails';
import VideoPlayer from '../pages/VideoPlayer';
import Scanner from '../pages/Scanner';
import Editor from '../pages/Editor';
import GiftOpen from '../pages/GiftOpen';
import Processing from '../pages/Processing';
import ProcessingICods from '../pages/ProcessingICodsCircleProgress';
import ProcessingICodsCircleProgress from '../pages/ProcessingICodsCircleProgress';
import ConnectionProblems from '../pages/ConnectionProblems';
import Working from '../pages/Working';
import { Animated } from 'react-native';

const App = createStackNavigator()

const invertedHorizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }: { current: any, layouts: any }) => {
    return cardStyleReturn(current, layouts, true);
  },
};


const cardStyleReturn = (current: any, layouts: any, isInverted: boolean) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: isInverted ? [-layouts.screen.width, 0] : [layouts.screen.width, 0],
        }),
      },
    ],
  },
});

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }: { current: any, layouts: any }) => {
    return cardStyleReturn(current, layouts, false);
  },
};

const Routes: React.FC = () => {
  const { user, token, isLoading } = useAuth()

  return (
    <App.Navigator mode='card' screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' }

    }}> 
      {
        isLoading ? (
          <App.Screen
            name='Splash'
            component={Splash}
            options={horizontalAnimation}
          />
        ) :
          user ? (
            <>
              <App.Screen name='Dashboard' component={Dashboard} options={horizontalAnimation} />
              <App.Screen name='Profile' component={Profile} options={horizontalAnimation}/>
              <App.Screen name='EditProfile' component={EditProfile} options={horizontalAnimation}/>
              <App.Screen name='History' component={History} options={horizontalAnimation}/>
              <App.Screen name='QRCodeHistoryDetails' component={QRCodeHistoryDetails} options={horizontalAnimation}/>
              <App.Screen name='Support' component={Support} options={horizontalAnimation}/>
              <App.Screen name='Editor' component={Editor} options={horizontalAnimation}/>
              <App.Screen name='ProcessingICodsCircleProgress' component={ ProcessingICodsCircleProgress } options={horizontalAnimation}/>
              <App.Screen name='Scanner' component={ Scanner } options={horizontalAnimation}/>
              <App.Screen name='VideoPlayer' component={ VideoPlayer } options={horizontalAnimation}/>
              <App.Screen name='Processing' component={ Processing } options={horizontalAnimation}/>
              <App.Screen name='ConnectionProblems' component={ConnectionProblems} options={horizontalAnimation}/>
              <App.Screen name='Working' component={Working} options={horizontalAnimation}/>
            </>
          ) : (
              <>
                <App.Screen name='SignIn' component={ SignIn } options={invertedHorizontalAnimation}/>
                <App.Screen name='Register' component={ Register } options={horizontalAnimation}/>
                <App.Screen name='Scanner' component={ Scanner } options={horizontalAnimation}/>
                <App.Screen name='VideoPlayer' component={ VideoPlayer } options={horizontalAnimation}/>
                <App.Screen name='GiftOpen' component={ GiftOpen } options={horizontalAnimation}/>
                <App.Screen name='ConnectionProblems' component={ ConnectionProblems } options={horizontalAnimation}/>
            </>
          )
      }
    </App.Navigator>
  )
}

export default Routes