import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RNCamera } from 'react-native-camera';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class Home extends Component {


    onCameraScannerClick = () => {
        Alert.alert('clicked');
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    _onBarCodeRead = (e) => {
        console.log(e);
        // Alert.alert(
        //     'Barcode Found!',
        //     `Type: ${e.type}\nData: ${e.data}`
        // );
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Text>Home</Text> */}
                {Platform.OS === 'ios' ?

                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        autoFocus
                        // androidRecordAudioPermissionOptions={{
                        //     title: 'Permission to use audio recording',
                        //     message: 'We need your permission to use your audio',
                        //     buttonPositive: 'Ok',
                        //     buttonNegative: 'Cancel',
                        // }}
                        onBarCodeRead={this._onBarCodeRead}
                    />
                    :
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        autoFocus
                        // androidRecordAudioPermissionOptions={{
                        //     title: 'Permission to use audio recording',
                        //     message: 'We need your permission to use your audio',
                        //     buttonPositive: 'Ok',
                        //     buttonNegative: 'Cancel',
                        // }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                    />
                }

                <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ backgroundColor: 'blue', paddingHorizontal: 16, paddingVertical: 8, marginTop: 16 }}>
                    <Text style={{ color: 'white' }}>Camera Scanner</Text>
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
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default Home;
