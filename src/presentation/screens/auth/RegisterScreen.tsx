import {Layout, Input, Text, Button} from '@ui-kitten/components';
import {ScrollView, useWindowDimensions} from 'react-native';
import {CustomIcon} from '../../components/ui';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Sign up</Text>
          <Text category="p2">Create an account to continue</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Full name"
            style={{marginBottom: 10}}
            keyboardType="default"
            accessoryLeft={<CustomIcon name="person-outline" />}
          />

          <Input
            placeholder="Email"
            style={{marginBottom: 10}}
            keyboardType="email-address"
            accessoryLeft={<CustomIcon name="email-outline" />}
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            style={{marginBottom: 10}}
            accessoryLeft={<CustomIcon name="lock-outline" />}
            secureTextEntry
          />
        </Layout>

        <Layout style={{height: 10}} />

        <Layout style={{marginTop: 20}}>
          <Button
            accessoryRight={<CustomIcon name="arrow-forward-outline" white />}>
            Register
          </Button>
        </Layout>
        <Layout
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text category="p2">Already have an account? </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            Log in
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
