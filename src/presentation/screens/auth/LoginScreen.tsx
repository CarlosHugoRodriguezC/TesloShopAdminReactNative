import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomIcon} from '../../components/ui';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {STAGE} from '@env';
import {useState} from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const [isPosting, setIsPosting] = useState(false);
  const {login} = useAuthStore();

  const [form, setForm] = useState({
    email: 'test1@google.com',
    password: 'Abc123',
  });

  const onLogin = async () => {
    if (form.email.trim() === '' || form.password.trim() === '')
      return console.log('Please fill all fields');
    setIsPosting(true);
    const loggedIn = await login(form.email, form.password);
    setIsPosting(false);
    if (!loggedIn) return Alert.alert('Error', 'Invalid credentials');
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Log in</Text>
          <Text category="p2">Enter your credentials to continue</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Email"
            style={{marginBottom: 10}}
            keyboardType="email-address"
            accessoryLeft={<CustomIcon name="email-outline" />}
            autoCapitalize="none"
            value={form.email}
            onChangeText={text => setForm({...form, email: text})}
          />

          <Input
            placeholder="Password"
            style={{marginBottom: 10}}
            accessoryLeft={<CustomIcon name="lock-outline" />}
            secureTextEntry
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
          />
        </Layout>

        <Layout style={{height: 10}} />

        <Layout style={{marginTop: 20}}>
          <Button
            accessoryRight={<CustomIcon name="arrow-forward-outline" white />}
            onPress={onLogin}
            disabled={isPosting}>
            Log in
          </Button>
        </Layout>
        <Layout
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text category="p2">Do not have an account yet? </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            Sign up
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
