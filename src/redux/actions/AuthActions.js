import {
    SAMPLE_TYPE,    //delete this line for a new project
} from '../types';
import APIService from '../../services/APIService';

//sample action
export const sampleAction = value => {
    return {
        type: SAMPLE_TYPE,
        payload: value
    };
};


// sample action using APIService 
export const fetchData = (param) => {
    return (dispatch) => {
        dispatch({ type: SAMPLE_TYPE });
        APIService.getSample(param).then(response => {
            dispatch({ type: SAMPLE_TYPE, payload: response });
        }).catch(error => {
            dispatch({ type: SAMPLE_TYPE });
            // do samoething with error response
            console.log(error);
        });
    };
};
