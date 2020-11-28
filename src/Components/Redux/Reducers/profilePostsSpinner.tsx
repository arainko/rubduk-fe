const profilePostsSpinner = (state = true, action: any) => {
    switch(action.type) {
        case 'POSTS_LOADED':
            return !state;
        default:
            return state;
    }
};

export default profilePostsSpinner