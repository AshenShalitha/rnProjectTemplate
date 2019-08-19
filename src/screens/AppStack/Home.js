import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    NativeModules,
    TouchableOpacity,
    Alert,
    TextInput
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

var ApplozicChat = NativeModules.ApplozicChat;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLogIn: false,
            user: {},
            userId: '',
            password: ''
        }

        // this.loginUser = this.loginUser.bind(this);
        // this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        console.log(ApplozicChat);
        ApplozicChat.isUserLogIn((response) => {
            if (response == "true") {
                /// User is logged in already
                console.log('Response ' + response);
                this.setState({ isUserLogIn: true });
            } else {
                /// User is not logged in yet.
                this.setState({ isUserLogIn: false });
            }
        })
    }

    loginUser = () => {
        console.log('login.....');
        var alUser = {
            'userId': this.state.userId,   //Replace it with the userId of the logged in user NOTE : userId need to be string and  +,*,? are not allowed chars in userId.
            'password': this.state.password,  //Put password here
            'authenticationTypeId': 1,
            'deviceApnsType': 0    //Set 0 for Development and 1 for Distribution (Release)
        };
        console.log('User ' + JSON.stringify(alUser));
        ApplozicChat.login(alUser, (error, response) => {
            console.log('Login ' + error);
            if (error) {
                //authentication failed callback
                this.setState({ isUserLogIn: false });
                console.log('Login ' + error);
                console.log('Error ' + response)
                // Alert.alert("Applozic Chat", "Login failed - " + JSON.parse(response).message, [{ text: "Ok" }]);
            } else {
                //authentication success callback 
                this.setState({ isUserLogIn: true });
                console.log('Login success...');
                console.log(response);
                // Alert.alert("Applozic Chat", "Login Successfull", [{ text: "Ok" }]);
            }
        })
    }

    logoutUser = () => {
        ApplozicChat.logoutUser((error, response) => {
            if (error) {
                console.log("error" + error);
                this.setState({ isUserLogIn: true });
                // Alert.alert("Applozic Chat", "Logout Failed - " + JSON.parse(response).message, [{ text: "Ok" }]);
            } else {
                this.setState({ isUserLogIn: false });
                console.log(response);
                // Alert.alert("Applozic Chat", "Logout Successfull", [{ text: "Ok" }]);
            }

        });
    }

    openChat = () => {
        ApplozicChat.openChatWithUser('test12');
        // ApplozicChat.openChat();
    }

    openGroupChat = () => {
        ApplozicChat.openChat();
    }

    sendMessage = () => {
        // ApplozicChat
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Home</Text>
                <Text>{this.state.isUserLogIn ? 'You already logged' : 'Please login'}</Text>

                {
                    !this.state.isUserLogIn ?
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 180 }}
                            onChangeText={(text) => this.setState({ userId: text })}
                            value={this.state.userId}
                            placeholder={'User Id'}
                        />
                        : null
                }
                {
                    !this.state.isUserLogIn ?
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 180 }}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            placeholder={'Password'}
                        />
                        : null
                }
                {
                    this.state.isUserLogIn ?
                        <TouchableOpacity onPress={this.logoutUser} style={{ backgroundColor: 'blue', padding: 8 }}>
                            <Text style={{ color: 'white' }}>Logout</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this.loginUser} style={{ backgroundColor: 'blue', padding: 8 }}>
                            <Text style={{ color: 'white' }}>Login</Text>
                        </TouchableOpacity>
                }
                {/* {
                    this.state.isUserLogIn ?
                        <TouchableOpacity onPress={this.openChat} style={{ backgroundColor: 'green', padding: 8, margin: 8 }}>
                            <Text style={{ color: 'white' }}>Private Chat</Text>
                        </TouchableOpacity>
                        : null
                } */}
                {
                    this.state.isUserLogIn ?
                        <TouchableOpacity onPress={this.openGroupChat} style={{ backgroundColor: 'green', padding: 8, margin: 8 }}>
                            <Text style={{ color: 'white' }}>Open Chat</Text>
                        </TouchableOpacity>
                        : null
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

export default Home;
