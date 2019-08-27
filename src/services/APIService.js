import request from './ApiCentral';
import {
    SAMPLE_ENDPOINT_URL
} from '../api/API';

function getSample(param) {
    return request({
        url: `${SAMPLE_ENDPOINT_URL}${param}`,
        method: 'GET',
    });
}

function getSampleTwo(param1, param2) {
    return request({
        url: `${SAMPLE_ENDPOINT_URL}${param1}/${param2}`,
        method: 'GET',
    });
}


function postSampleData(data1, data2, data3) {
    return request({
        url: `${SAMPLE_ENDPOINT_URL}`,
        method: 'POST',
        data: {
            field1: data1,
            field2: data2,
            fields3: data3
        }
    });
}


const APIService = {
    getSample,
    getSampleTwo,
    postSampleData
};

export default APIService;
