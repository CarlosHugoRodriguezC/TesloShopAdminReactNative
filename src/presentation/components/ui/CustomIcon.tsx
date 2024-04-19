import {Icon, useTheme} from '@ui-kitten/components';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
}

export const CustomIcon = ({name, color, white = false}: Props) => {
  const theme = useTheme();

  const iconColor = useMemo(() => {
    if (white) return theme['color-info-100'];
    if (!color) return theme['text-basic-color'];

    return color;
  }, [color, white, theme]);

  return <Icon name={name} fill={iconColor} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
