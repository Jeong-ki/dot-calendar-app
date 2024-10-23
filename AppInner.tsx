import React from 'react';
import AppStack from '@/navigation/app-stack';
import LoginStack from '@/navigation/login-stack';
import { RootState } from '@/store/reducer';
import { useSelector } from 'react-redux';

function AppInner(): React.JSX.Element {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.user);
  return isLoggedIn ? <AppStack /> : <LoginStack />;
}

export default AppInner;
