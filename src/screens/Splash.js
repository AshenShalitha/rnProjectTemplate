import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Background from '../components/Background';
import Logo from '../components/Logo';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('App');
        }, 3000);
    }
    render() {
        return (
            <Background>
                <Logo size={180} />
            </Background>
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

export default Splash;
