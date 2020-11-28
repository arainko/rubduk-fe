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

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const profilePostsLoaded = () => {
    return {
        type: 'POSTS_LOADED',
        payload: true
    }
}

export const userLoaded = () => {
    return {
        type: 'USER_LOADED',
        payload: true
    }
}