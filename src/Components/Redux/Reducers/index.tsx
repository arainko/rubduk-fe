import isLoggedReducer from './isLogged';
import setPostsReducer from './setPosts'
import profilePostsSpinner from './profilePostsSpinner'
import userPageSpinner from './userPageSpinner'
import setUserReducer from './setUser'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    posts: setPostsReducer,
    isSpinnerInProfilePosts: profilePostsSpinner,
    user: setUserReducer,
    isSpinnerInUserPage: userPageSpinner

})

export default allReducers