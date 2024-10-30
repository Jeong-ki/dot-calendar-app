import React from 'react';
import { Text, View } from 'react-native';
import { HomeScreenProps } from '@/navigation/types';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
