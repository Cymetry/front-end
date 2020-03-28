import React from 'react';
import { Platform } from '@unimodules/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Variables from '../../../assets/styles/variables';

export const createNavigationOptions = title => ({
  title,
});

export const createTabNavigationOptions = (title, iconName) => ({
  tabBarLabel: title,
  tabBarIcon: ({ color }) => (
    <Ionicons
      size={24}
      color={color}
      name={Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`}
      style={{
        marginTop: 5,
      }}
    />
  ),
  tabBarOptions: {
    activeTintColor: Variables.blue,
    inactiveTintColor: Variables.grey,
    style: {
      height: 60,
      paddingTop: 8,
      paddingBottom: 8,
      borderTopWidth: 1,
      alignItems: 'center',
      borderTopColor: Variables.gray,
      backgroundColor: Variables.lightGray,
    },
    labelStyle: {
      margin: 0,
      padding: 0,
      fontSize: 12,
    },
  },
});

// Would be set from home component
export const navigationWrapper = {};
