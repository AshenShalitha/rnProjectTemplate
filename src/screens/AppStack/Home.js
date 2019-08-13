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
import AsyncStorage from '@react-native-community/async-storage';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '1031663605715-m74891ags1jiltipo6hv3jqj7g4l1pdj.apps.googleusercontent.com'
        });
        AsyncStorage.getItem('user').then(user => {
            this.setState({ user: JSON.parse(user) });
            console.log(`User details ${JSON.parse(user).email}`);
        }).catch(error => {
            console.log(`Error geting saved user ${error}`);
        });
    }

    signOutClick = async () => {
        try {
            await GoogleSignin.signOut().then(response => {
                this.props.navigation.navigate('Auth');
            }).catch(error => {
                console.log(`Error ${error.message}`);
            });
        } catch (error) {
            console.log(`Error sign out : ${error.message}`);
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>User Profile</Text>
                <Text>Name : {this.state.user ? this.state.user.displayName : ''}</Text>
                <Text>Email : {this.state.user ? this.state.user.email : ''}</Text>
                <Text>User Id : {this.state.user ? this.state.user.uid : ''}</Text>
                <TouchableOpacity onPress={this.signOutClick} style={{ alignItems: 'baseline', justifyContent: 'flex-end', backgroundColor: 'red', marginTop: 96 }}>
                    <Text style={{ color: '#fff', fontSize: 18, paddingHorizontal: 16, paddingVertical: 4 }}>Logout</Text>
                </TouchableOpacity>
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
