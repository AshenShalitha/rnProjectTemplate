import {
    SAMPLE_TYPE, //delete this line for a new project
} from '../types';

const INITIAL_STATE = {
    sample: '', //delete this line for a new project
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAMPLE_TYPE:
            return { ...state, sample: action.payload }; //delete this case for a new project
        default:
            return state;
    }
};
