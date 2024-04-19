import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Layout, Text} from '@ui-kitten/components';
import {RootStackParams} from '../../navigation/StackNavigator';

export const NotFound = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">404</Text>
      <Text category="h6">Not Found</Text>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </Layout>
  );
};
