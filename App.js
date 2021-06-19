import { StatusBar } from 'react-native';
import React from 'react';
import Stack from './src/screens/StackNavigator';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='#141514' />
      <Stack />
    </>
  );
}
