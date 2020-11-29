const commentsSpinner = (state = true, action: any) => {
    switch(action.type) {
        case 'COMMENTS_LOADED':
            return false;
        case 'COMMENTS_NOT_LOADED':
            return true;
        default:
            return state;
    }
};

export default commentsSpinner