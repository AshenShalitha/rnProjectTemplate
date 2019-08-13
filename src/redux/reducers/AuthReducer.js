import {
    USER_DETAILS_SAVED, //delete this line for a new project
} from '../types';

const INITIAL_STATE = {
    user: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DETAILS_SAVED:
            return { ...state, sample: action.payload }; //delete this case for a new project
        default:
            return state;
    }
};
