const mediaSpinner = (state = true, action: any) => {
    switch(action.type) {
        case 'MEDIA_LOADED':
            return false;
        case 'MEDIA_NOT_LOADED':
            return true;
        default:
            return state;
    }
};

export default mediaSpinner