import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login-screen';

const Stack = createNativeStackNavigator();

const StackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
  </Stack.Navigator>
);

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
