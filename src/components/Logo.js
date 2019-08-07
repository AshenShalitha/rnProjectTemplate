import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import logoImg from '../assets/images/rn_logo.png';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default class Logo extends Component {
    render() {
        return (
            <Image source={logoImg} style={styles.image} />
        );
    }
}

const styles = EStyleSheet.create({
    image: {
        width: '136rem',
        height: '138rem'
    }
});
