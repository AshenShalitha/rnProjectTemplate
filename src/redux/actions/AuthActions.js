import {
    SAMPLE_TYPE,    //delete this line for a new project
} from '../types';

//sample action
export const sampleAction = value => {
    return {
        type: SAMPLE_TYPE,
        payload: value
    };
};
