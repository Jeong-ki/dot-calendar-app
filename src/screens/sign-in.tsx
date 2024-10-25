import React from 'react';
import { SignInScreenProps } from '@/navigation/types';
import { Text, View } from 'react-native';
import Button from '@/components/elements/button';
import { RouteNames } from '@/navigation/route-names';


const SignInScreen = ({navigation}: SignInScreenProps) => {
  const testBtn = () => {
    navigation.navigate(RouteNames.signUp);
  };

  return (
    <View>
      <Text>SignIn</Text>
      <Button onClick={testBtn}>페이지 이동</Button>
    </View>
  );
};

export default SignInScreen;
