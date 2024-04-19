import React from 'react';
import {StatusBar} from 'react-native';

export const CustomStatusBar = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent={true}
      animated={true}
    />
  );
};
