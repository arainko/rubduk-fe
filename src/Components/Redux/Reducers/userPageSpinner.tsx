const userPageSpinner = (state = true, action: any) => {
    switch(action.type) {
        case 'PROFILE_USER_LOADED':
            return false;
        case 'PROFILE_NOT_USER_LOADED':
            return true;
        default:
            return state;
    }
};

export default userPageSpinner