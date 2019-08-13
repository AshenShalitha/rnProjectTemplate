import React, { Component } from 'react';
import {
    Dimensions,
    View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { GSignIn } from '../../components';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <GSignIn />
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
