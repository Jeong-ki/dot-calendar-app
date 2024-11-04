import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '@/components/elements';
import { HomeScreenProps } from '@/navigation/types';
import { RouteNames } from '@/navigation/route-names';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [testValue, setTestValue] = useState('Initial Value');

  const goUserScreen = () => {
    navigation.navigate(RouteNames.user);
  };

  return (
    <View>
      <Text>Home</Text>
      <Text>{testValue}</Text>
      <Button text="First" onClick={() => setTestValue('First Value')} />
      <Button text="Second" onClick={() => setTestValue('Second Value')} />
      <Button text="Go User" onClick={goUserScreen} />
    </View>
  );
};

export default HomeScreen;
