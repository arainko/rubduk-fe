const userPageSpinner = (state = true, action: any) => {
    switch(action.type) {
        case 'PROFILE_USER_LOADED':
            return !state;
        default:
            return state;
    }
};

export default userPageSpinner