import React, { Component } from 'react';
import {
    Dimensions,
    View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'react-native-firebase';

import { colors } from '../config/Colors';
import Logo from '../components/Logo';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
                this.setState({
                    loading: false,
                    user,
                });
            });
            if (this.state.user) {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Logo />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
});
