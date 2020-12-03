const setSessionUserReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_SESSION_USER':
            return action.payload;
        case 'RESET_SESSION_USER':
            return null;
        default:
            return state;
    }
};

export default setSessionUserReducer