import axios from 'axios';
import config from '../appConfig.json'

const fetchPosts = () => axios.get( config.apiURL + 'posts')
    .then(res => {
    return res.data.entities;
})

const fetchPostsByFriends = (authToken: string) => axios.get(
    config.apiURL + 'feed/posts',
    headerJsonAuthorization(authToken)
    )
    .then(res => {
    return res.data.entities;
})

const fetchPostsByUserId = (userId: number) => axios.get(config.apiURL + 'posts?userId=' + userId)
    .then(res => {
    return res.data.entities;
})

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

const headerJsonAuthorization = (authToken: String) => {
    return {
        headers: {
            'Authorization': authToken
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

const updatePost = (
    postId: number, 
    userId: number, 
    authTokenId: string, 
    contents: string) => {
        axios.put(
            config.apiURL + 'posts/' + postId, 
            jsonify(contents), 
            headerJsonConfiguration(userId, authTokenId)
            )
        .then(res => {
        return res.data;
        })
    }

export const PostAPI = {
    fetchPosts, fetchPostsByUserId, postPost, updatePost, fetchPostsByFriends
};