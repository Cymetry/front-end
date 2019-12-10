import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from '@unimodules/core';

import Variables from '../../../assets/styles/variables';

export const createNavigationOptions = title => ({
  title,
});

export const createTabNavigationOptions = (headerTitle, title, iconName) => ({
  title: headerTitle,
  tabBarLabel: title,
  tabBarIcon: ({ tintColor }) => <Ionicons
    name={Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`}
    size={24}
    color={tintColor}
  />,
  tabBarOptions: {
    inactiveTintColor: 'black',
    activeTintColor: Variables.blue,
    style: {
      height: 60,
      paddingTop: 8,
      paddingBottom: 8,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: Variables.gray,
      backgroundColor: Variables.lightGray,
    },
    labelStyle: {
      fontSize: 12,
      padding: 0,
      margin: 0,
    },
  }
});