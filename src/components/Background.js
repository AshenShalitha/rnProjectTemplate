import React, { Component } from 'react';
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import bgSrc from '../images/bg.jpg';

export default class Background extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc} >
        {this.props.children}
        <StatusBar hidden />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch',
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
