const setGoogleTokenIdReducer = (state = '', action: any) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return action.payload;
        case 'RESET_TOKEN':
            return '';
        default:
            return state;
    }
};

export default setGoogleTokenIdReducer