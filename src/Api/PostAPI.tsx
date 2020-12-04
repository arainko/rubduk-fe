import axios from 'axios';
import config from '../appConfig.json'

const fetchPosts = () => axios.get( config.apiURL + 'posts')
    .then(res => {
    return res.data.entities;
})

const fetchPostsByUserId = (userId: number) => axios.get( config.apiURL + 'posts?userId=' + userId)
    .then(res => {
    return res.data.entities;
})

// TODO again, interfaces, press ctrl+f "any" to build interfaces for other types waiting 

const jsonify = (text: String) => {
    return JSON.stringify({ contents: text })
}

const headerJsonConfiguration = (userId: number, authToken: String) => {
    return {
        headers: {
            'User-id': userId,
            'Authorization': authToken,
            'content-type': 'application/json'
        }
    }
}

const postPost = (userId: number, contents: String, authTokenId: String) => {
    axios.post(
        config.apiURL + 'posts', 
        jsonify(contents), 
        headerJsonConfiguration(userId, authTokenId)
        )
    .then(res => {
    return res.data;
})
}

export const PostAPI = {
    fetchPosts, fetchPostsByUserId, postPost
};