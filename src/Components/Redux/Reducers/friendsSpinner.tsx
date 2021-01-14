const friendsSpinner = (state = true, action: any) => {
    switch(action.type) {
        case 'FRIENDS_LOADED':
            return !state;
        case 'FRIENDS_NOT_LOADED':
            return true;
        default:
            return state;
    }
};

export default friendsSpinner