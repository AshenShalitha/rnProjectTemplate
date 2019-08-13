import {
    USER_DETAILS_SAVED,    //delete this line for a new project
} from '../types';

//sample action
export const saveUser = value => {
    return {
        type: USER_DETAILS_SAVED,
        payload: value
    };
};
