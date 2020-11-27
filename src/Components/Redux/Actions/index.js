export const logIn = () => {
    return {
        type: 'SIGN_IN',
        payload: true
    }
}

export const setPosts = (posts) => {
    return {
        type: 'SET_POSTS',
        payload: posts
    }
}