import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import HomePage from '../HomePage';
import MyPage from '../MyPage'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ color, size }) => (
            <Image style={{width: size, height:size}} />
          ),
          headerBackTitle: null,
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPage}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <Image style={{width: size, height:size}} />
          ),
        }}
      />
    </Tab.Navigator>
    );
}

export default Tabs;