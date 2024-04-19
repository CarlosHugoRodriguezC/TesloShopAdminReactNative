import {Button} from '@ui-kitten/components';
import React from 'react';
import {CustomIcon} from './CustomIcon';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName?: string;
  onPress?: () => void;
}

export const FAB = ({style, iconName = 'plus', onPress}: Props) => {
  return (
    <Button
      style={[
        style,
        {
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 13,
        },
      ]}
      accessoryLeft={<CustomIcon name={iconName} white />}
      onPress={onPress}
    />
  );
};
