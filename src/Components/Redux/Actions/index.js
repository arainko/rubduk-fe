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

export const setComments = (comments) => {
    return {
        type: 'SET_COMMENTS',
        payload: comments
    }
}

export const resetComments = () => {
    return {
        type: 'RESET_COMMENTS',
        payload: null
    }
}

export const commentsLoaded = () => {
    return {
        type: 'COMMENTS_LOADED',
        payload: null
    }
}

export const commentsNotLoaded = () => {
    return {
        type: 'COMMENTS_NOT_LOADED',
        payload: null
    }
}