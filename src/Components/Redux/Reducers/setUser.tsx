const setUserReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_USER':
            return action.payload;
        default:
            return state;
    }
};

export default setUserReducer