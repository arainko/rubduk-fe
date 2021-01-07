const setMediaToUploadReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_MEDIA_UPLOAD':
            return action.payload;
        case 'RESET_MEDIA_UPLOAD':
            return null;
        default:
            return state;
    }
};

export default setMediaToUploadReducer