import isLoggedReducer from './isLogged';
import setPostsReducer from './setPosts'
import profilePostsSpinner from './profilePostsSpinner'
import userPageSpinner from './userPageSpinner'
import setUserReducer from './setProfileUser'
import setCommentsReducer from './setComments'
import commentsSpinerReducer from './commentsSpiner'
import setGoogleTokenIdReducer from './setGoogleTokenId'
import setSessionUserReducer from './setSessionUser'
import {combineReducers} from 'redux';
import mediaSpinner from './mediaAreaSpinner';
import setMediaReducer from './setMedia';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    posts: setPostsReducer,
    isSpinnerInPosts: profilePostsSpinner,
    profileUser: setUserReducer,
    isSpinnerInUserPage: userPageSpinner,
    comments: setCommentsReducer,
    isSpinnerInComments: commentsSpinerReducer,
    GoogleTokenId: setGoogleTokenIdReducer,
    sessionUser: setSessionUserReducer,
    media: setMediaReducer,
    isSpinnerInMedia: mediaSpinner
})

export default allReducers