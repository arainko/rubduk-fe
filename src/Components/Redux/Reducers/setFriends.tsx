const setFriendsReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_FRIENDS':
            return action.payload;
        case 'RESET_FRIENDS':
            return null;
        default:
            return state;
    }
};

export default setFriendsReducer