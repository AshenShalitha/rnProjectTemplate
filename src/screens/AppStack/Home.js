import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        };
    }

    componentDidMount() {
        // this.getCurrentUserInfo();
        GoogleSignin.configure({
            webClientId: '1031663605715-m74891ags1jiltipo6hv3jqj7g4l1pdj.apps.googleusercontent.com'
        });
    }

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                this.props.navigation.navigate('Auth');
            } else {
                // some other error
                Alert.alert('Error', 'User info not available', [{ text: 'OK' }]);
            }
        }
    };

    signOutClick = async () => {
        try {
            await GoogleSignin.signOut().then(response => {
                this.props.navigation.navigate('Auth');
            }).catch(error => {
                console.log('Error ' + error.message);
            });
        } catch (error) {
            console.log('Error sign out : ' + error.message);
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Home</Text>
                <TouchableOpacity onPress={this.signOutClick} style={{ alignItems: 'baseline', justifyContent: 'flex-end', backgroundColor: 'red', marginTop: 96 }}>
                    <Text style={{ color: '#fff', fontSize: 18, paddingHorizontal: 16, paddingVertical: 4 }}>Logout</Text>
                </TouchableOpacity>
                <Text>Name : </Text>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
