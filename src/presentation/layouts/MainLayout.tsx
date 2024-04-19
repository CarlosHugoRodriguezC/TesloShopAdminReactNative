import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParams} from '../navigation/StackNavigator';
import {CustomIcon} from '../components/ui';

interface Props {
  title: string;
  subtitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;

  children: React.ReactNode;
}

export const MainLayout = ({
  title,
  subtitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<CustomIcon name="arrow-back-outline" />}
      onPress={() => navigation.goBack()}
    />
  );

  const RenderRightAction = () => {
    if (!rightAction || !rightActionIcon) {
      return null;
    }
    return (
      <TopNavigationAction
        icon={<CustomIcon name={rightActionIcon} />}
        onPress={rightAction}
      />
    );
  };

  return (
    <Layout style={{paddingTop: top, flex: 1}}>
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={navigation.canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{flex: 1}}>{children}</Layout>
    </Layout>
  );
};
