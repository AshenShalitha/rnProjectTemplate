import { GoogleSignin } from 'react-native-google-signin';

const WEB_CLIENT_ID = '1031663605715-m74891ags1jiltipo6hv3jqj7g4l1pdj.apps.googleusercontent.com';

function configGoogleClient() {
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID
    });
}

const Config = {
    configGoogleClient
};

export default Config;
