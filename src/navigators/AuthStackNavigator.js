import { createStackNavigator } from 'react-navigation';
import Login from '../screens/AuthStack/Login';

export const AuthStackNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
            headerMode: 'Login',
            header: null,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Login'
    }
);
