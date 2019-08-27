import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../api/API';

const request = async function (options, isHeader = true) {
    let authHeader = null;
    /**
        Line 10 to 26 logic to refresh the token using refresh token if the token expired 
        add this if you need to check  token expirations otherwise load stored token
     **/
    if (isHeader) {
        const expiresIn = JSON.parse(await AsyncStorage.getItem('expiresIn'));
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        // console.log(`Refresh Token : ${refreshToken}`);
        if ((Date.now() / 1000) >= (expiresIn - 300)) {
            // call get access token api before store the tokens data
            // fetch api call to get access token from the refresh token
            AsyncStorage.setItem('refreshToken', result.refreshToken);
            AsyncStorage.setItem('expiresIn', JSON.stringify(result.expires_in));
            AsyncStorage.setItem('accessToken', result.accessToken);
            authHeader = `Bearer ${await AsyncStorage.getItem('accessToken')}`;
        } else {
            // return access token that stored
            authHeader = `Bearer ${await AsyncStorage.getItem('accessToken')}`;
            // console.log(`AuthHeader : ${authHeader}`);
        }
    }
    console.log(`AuthHeader : ${authHeader}`);
    // configure the client with token
    const client = axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: authHeader },
        timeout: 5000,
    });

    // when request success
    const onSuccess = function (response) {
        console.log('Request Successful!', response);
        return response.data;
    };

    // when request error occure
    const onError = function (error) {
        console.log('Request Failed:', error.config);
        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            console.log('Headers:', error.response.headers);
        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.log('Error Message:', error.message);
        }
        return Promise.reject(error.response || error.message);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;
