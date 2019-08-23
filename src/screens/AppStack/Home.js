import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    NativeModules,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

var ApplozicChat = NativeModules.ApplozicChat;


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: 'test123',
            email: 'test@gmail.com',
            phoneNumer: '',
            pass_word: '1234',
            displayName: 'Test',
            loggedIn: false,
            visible: false,
            title: 'Login/SignUp',
            mytoken: ''
        };

        // this.isUserLogIn = this.isUserLogIn.bind(this);
        this.chatLogin = this.chatLogin.bind(this);
        // this.logoutUser = this.logoutUser.bind(this);
        // this.show = this.show.bind(this);
        // this.openChat = this.openChat.bind(this);
        // this.createGroup = this.createGroup.bind(this);
        // this.addMemberToGroup = this.addMemberToGroup.bind(this);
        // this.openChatWithUser = this.openChatWithUser.bind(this);

        // this.getUnreadCountForUser = this.getUnreadCountForUser.bind(this);
        // this.getUnreadCountForChannel = this.getUnreadCountForChannel.bind(this);
        // this.totalUnreadCount = this.totalUnreadCount.bind(this);
    }

    componentDidMount() {
        var alUser = {
            userId: 'test123',   //Replace it with the userId of the logged in user NOTE : userId need to be string and  +,*,? are not allowed chars in userId.
            password: '1234',  //Put password here
            authenticationTypeId: 1,
            deviceApnsType: 0    //Set 0 for Development and 1 for Distribution (Release)
        };
        setTimeout(()=>{});
        // console.log(ApplozicChat);
        ApplozicChat.login(alUser, (error, response) => {
            if (error) {
                //authentication failed callback
                console.log(error);
            } else {
                //authentication success callback 
                console.log(response);
            }
        });
        // this.chatLogin();
        // ApplozicChat.isUserLogIn((response) => {
        //     if (response === 'true') {
        //         /// User is logged in already
        //         console.log('Logged ' + response);
        //     } else {
        //         /// User is not logged in yet.
        //         console.log('Not logged ' + response);
        //     }
        // });
    }


    //Login chat to the users..
    chatLogin() {
        if (this.state.userId.length > 0 && this.state.pass_word.length > 0) {
            ApplozicChat.login({
                userId: this.state.userId,
                email: this.state.email,
                contactNumber: this.state.phoneNumber,
                password: this.state.pass_word,
                displayName: this.state.displayName
            }, (error, response) => {
                console.log(`response::${response}`);
                if (error) {
                    console.log(`errorrrrr ${error}`);
                } else {
                    this.setState({ loggedIn: true, title: 'Loading...' });
                    // this.createGroup();
                    console.log(`response::${response}`);
                }
            });
        } else {
            this.setState({ title: 'Login/SignUp' });
            alert('Please Enter UserId & Password');
        };
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Home</Text>
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
