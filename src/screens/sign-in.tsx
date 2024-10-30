import React from 'react';
import { Text, View } from 'react-native';
import { SignInScreenProps } from '@/navigation/types';
import Button from '@/components/elements/button';
import { RouteNames } from '@/navigation/route-names';
import { useGetDummyUserQuery } from '@/slices/api/auth';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { data, isFetching, isLoading } = useGetDummyUserQuery();
  console.log('api 테스트: ', data?.data[0].email, isFetching, isLoading);

  const testBtn = () => {
    navigation.navigate(RouteNames.signUp);
  };

  return (
    <View>
      <Text>SignIn</Text>
      <Button onClick={testBtn} text="페이지 이동" />
      <Text>{data?.data[0].email}</Text>
    </View>
  );
};

export default SignInScreen;
