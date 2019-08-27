import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GiftedChat } from 'react-native-gifted-chat';
import { StreamChat } from 'stream-chat';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class Home extends Component {

    state = {
        messages: [],
    }
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'My test message',
                    createdAt: new Date(Date.now()),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                    image: 'https://images.unsplash.com/photo-1566500155667-5dc6e1ae4945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    // You can also add a video prop:
                    // video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    // Any additional custom parameters are passed through
                },
            ],
        });
    }
    async componentDidMount() {
        const client = new StreamChat('bdeqdvmwpx4n');
        await client.setUser(
            {
                id: 'roshan',
                name: 'Roshan Maddumage',
                image: 'https://i.imgur.com/fR9Jz14.png',
            },
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.hkB6JFtPsdL50n0S9p_KraLDBrTyVCwsAPzv6G9owuY',
        );
        const channel = client.channel('messaging', 'travel', {
            name: 'Awesome channel about traveling',
        });
        // fetch the channel state, subscribe to future updates
        let state = await channel.watch();
        console.log(state);
        const text = 'Hi, This is a test message';
        const response = await channel.sendMessage({
            text,
            customfield: '123',
        });
        console.log(response);
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }


    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
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
