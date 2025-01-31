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

// posts spinner

export const postsNotLoaded = () => {
    return {
        type: 'POSTS_NOT_LOADED',
        payload: true
    }
}

export const postsLoaded = () => {
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

// user profile spinner

export const profileUserLoaded = () => {
    return {
        type: 'PROFILE_USER_LOADED',
        payload: false
    }
}

export const profileUserNotLoaded = () => {
    return {
        type: 'PROFILE_NOT_USER_LOADED',
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

// comments spinner

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

// media


export const setMedia = (media) => {
    return {
        type: 'SET_MEDIA',
        payload: media
    }
}

export const resetMedia = () => {
    return {
        type: 'RESET_MEDIA',
        payload: null
    }
}

// media spinner

export const mediaLoaded = () => {
    return {
        type: 'MEDIA_LOADED',
        payload: null
    }
}

export const mediaNotLoaded = () => {
    return {
        type: 'MEDIA_NOT_LOADED',
        payload: null
    }
}

// media to upload


export const setMediaToUpload = (media) => {
    return {
        type: 'SET_MEDIA_UPLOAD',
        payload: media
    }
}

export const resetMediaToUpload = () => {
    return {
        type: 'RESET_MEDIA_UPLOAD',
        payload: null
    }
}

// friends

export const setFriends = (friends) => {
    return {
        type: 'SET_FRIENDS',
        payload: friends
    }
}

export const resetFriends = () => {
    return {
        type: 'RESET_FRIENDS',
        payload: null
    }
}

// friends spinner

export const friendsLoaded = () => {
    return {
        type: 'FRIENDS_LOADED',
        payload: null
    }
}

export const friendsNotLoaded = () => {
    return {
        type: 'FRIENDS_NOT_LOADED',
        payload: null
    }
}

// invites

export const setInvites = (invites) => {
    return {
        type: 'SET_INVITES',
        payload: invites
    }
}

export const resetInvites = () => {
    return {
        type: 'RESET_INVITES',
        payload: null
    }
}

// invites spinner

export const invitesLoaded = () => {
    return {
        type: 'INVITES_LOADED',
        payload: null
    }
}

export const invitesNotLoaded = () => {
    return {
        type: 'INVITES_NOT_LOADED',
        payload: null
    }
}
