import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import EditProfile from '../pages/EditProfile';
import History from '../pages/History';
import Profile from '../pages/Profile';
import Scanner from '../pages/Scanner';
import Support from '../pages/Support';
import Version from '../pages/Version';
import Working from '../pages/Working';

const { Navigator, Screen } = createStackNavigator();

export const DashboardRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Support" component={Support} />
      <Screen name="About" component={About} />
      <Screen name="EditProfile" component={EditProfile} />
      <Screen name="Version" component={Version} />
    </Navigator>
  );
};
