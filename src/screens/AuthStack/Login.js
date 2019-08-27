import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StreamChat } from 'stream-chat';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const client = new StreamChat('bdeqdvmwpx4n');

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {

    }

    async onLoginClick() {
        const { username, password } = this.state;
        client.disconnect();
        // await client.setUser(
        //     {
        //         id: username,
        //         name: username,
        //         image: 'https://getstream.io/random_svg/?name=John',
        //     },
        //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.hkB6JFtPsdL50n0S9p_KraLDBrTyVCwsAPzv6G9owuY',
        // );
        await client.setGuestUser({ id: 'tommaso' });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Login</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                        placeholder={'Username'}
                    />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder={'Password'}
                        textContentType={'password'}
                    />
                </View>
                <TouchableOpacity onPress={this.onLoginClick.bind(this)} style={{ backgroundColor: 'blue', paddingHorizontal: 16, marginTop: 16, paddingVertical: 8 }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Login</Text>
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
    formContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginHorizontal: EStyleSheet.value('30rem'),
        justifyContent: 'center'
    },
    textInput: {
        fontSize: '18rem',
        color: '#ffffff',
        marginLeft: Platform.OS === 'ios' ? '0rem' : '-4rem'
    },
    textInputLabel: {
        fontSize: '12rem',
        color: '#ffffff',
        marginBottom: '14rem'
    },
});

export default Login;
