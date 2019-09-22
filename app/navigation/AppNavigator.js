import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ScreenOne from '../screens/ScreenOne';
import ScreenTwo from '../screens/ScreenTwo';

const AppNavigator = createStackNavigator({
  ScreenOne: {
    screen: ScreenOne,
  },
  ScreenTwo: {
    screen: ScreenTwo,
  }
}, {
  initialRouteName: 'ScreenOne'
});

export default createAppContainer(AppNavigator);