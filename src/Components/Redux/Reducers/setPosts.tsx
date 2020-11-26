import { PostAPI } from '../../../Api/PostAPI'

const isLoggedReducer = (state = [], action: any) => {
    switch(action.type) {
        case 'SET_POSTS':
            return action.payload;
        default:
            return [0];
    }
};

export default isLoggedReducer