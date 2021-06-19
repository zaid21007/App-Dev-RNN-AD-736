import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingSreen from './AdminPanelScreens/SettingSreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode={false} initialRouteName={LoginScreen}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Settings' component={SettingSreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
