export const logIn = () => {
    return {
        type: 'SIGN_IN',
        payload: true
    }
}

// posts

export const setPosts = (posts) => {
    return {
        type: 'SET_POSTS',
        payload: posts
    }
}

export const profilePostsLoaded = () => {
    return {
        type: 'POSTS_LOADED',
        payload: true
    }
}

// user profile

export const setProfileUser = (user) => {
    return {
        type: 'SET_PROFILE_USER',
        payload: user
    }
}

export const profileUserLoaded = () => {
    return {
        type: 'PROFILE_USER_LOADED',
        payload: true
    }
}

// comments

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

// google token

export const setGoogleTokenId = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

export const resetGoogleTokenId = () => {
    return {
        type: 'RESET_TOKEN',
        payload: null
    }
}

// session user

export const setSessionUser = (user) => {
    return {
        type: 'SET_SESSION_USER',
        payload: user
    }
}

export const resetSessionUser = () => {
    return {
        type: 'RESET_SESSION_USER',
        payload: null
    }
}