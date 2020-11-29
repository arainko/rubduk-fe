import isLoggedReducer from './isLogged';
import setPostsReducer from './setPosts'
import profilePostsSpinner from './profilePostsSpinner'
import userPageSpinner from './userPageSpinner'
import setUserReducer from './setUser'
import setComments from './setComments'
import commentsSpiner from './commentsSpiner'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    posts: setPostsReducer,
    isSpinnerInProfilePosts: profilePostsSpinner,
    user: setUserReducer,
    isSpinnerInUserPage: userPageSpinner,
    comments: setComments,
    isSpinnerInComments: commentsSpiner
})

export default allReducers