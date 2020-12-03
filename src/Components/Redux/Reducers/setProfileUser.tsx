const setProfileUserReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_PROFILE_USER':
            return action.payload;
        default:
            return state;
    }
};

export default setProfileUserReducer