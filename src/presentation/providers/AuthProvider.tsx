import React, {PropsWithChildren, useEffect} from 'react';
import {useAuthStore} from '../store/auth/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigator';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const {status, checkStatus} = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});
    }
    if (status === 'unauthenticated') {
      navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
    }
  }, [status]);

  return <>{children}</>;
};
