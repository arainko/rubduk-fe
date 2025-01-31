const setPostsReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_POSTS':
            return action.payload;
        default:
            return state;
    }
};

export default setPostsReducer