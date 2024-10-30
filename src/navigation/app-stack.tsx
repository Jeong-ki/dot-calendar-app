import React from 'react';
import { HomeScreen, UserScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { StackParamList } from './types';
import { RouteNames } from './route-names';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={RouteNames.home}>
      <Stack.Screen
        name={RouteNames.home}
        component={HomeScreen as React.ComponentType}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteNames.user}
        component={UserScreen as React.ComponentType}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
