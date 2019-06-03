import { createStackNavigator } from 'react-navigation';
import Home from '../screens/AppStack/Home';

export const AppStackNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Home'
    }
);
