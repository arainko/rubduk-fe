import isLoggedReducer from './isLogged';
import setPostsReducer from './setPosts'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    posts: setPostsReducer
})

export default allReducers