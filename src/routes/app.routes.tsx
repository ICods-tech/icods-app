import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <>
      <Screen name="Home" component={Dashboard} />
      <Screen name="History" component={History} />
    </>// 
  )
}