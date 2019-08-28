import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import logoImg from '../images/logo.png';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const Logo = ({ size }) => {
    return (
        <View style={styles.container}>
            <Image source={logoImg} style={{ width: size, height: size }} />
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Logo;
