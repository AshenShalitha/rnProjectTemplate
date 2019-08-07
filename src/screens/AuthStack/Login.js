import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Alert
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSigninInProgress: false,
            userInfo: null,
            loading: true
        };
    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '1031663605715-m74891ags1jiltipo6hv3jqj7g4l1pdj.apps.googleusercontent.com'
        });
    }

    // // Somewhere in your code
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo });
            // save access token or id token if needed
            if (userInfo !== null) {
                this.props.navigation.navigate('App');
            }
        } catch (error) {
            console.log(`Error -- ${error}`);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                Alert.alert(
                    'Login failed',
                    'You canceled the login!',
                    [{ text: 'OK' }]
                );
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                Alert.alert(
                    'Alert',
                    'Please wait, another login process is in progress',
                    [{ text: 'OK' }]
                );
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                Alert.alert(
                    'Sorry',
                    'Google play services not available or outdated, Please install and try again',
                    [{ text: 'OK' }]
                );
            } else {
                // some other error happened
                console.log('Error -- Somthing went wrong');
                Alert.alert(
                    'Error',
                    'Something went wrong!',
                    [{ text: 'OK' }]
                );
            }
        }
    };

    renderGoogleSignInButton() {
        return (
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
                disabled={this.state.isSigninInProgress}
            />
        );
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                {
                    this.renderGoogleSignInButton()
                }
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

export default Login;
