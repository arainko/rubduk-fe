const setMediaReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_MEDIA':
            return action.payload;
        case 'RESET_MEDIA':
            return null;
        default:
            return state;
    }
};

export default setMediaReducer