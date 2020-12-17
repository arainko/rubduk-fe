import axios from 'axios';
import config from '../appConfig.json'

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

const fetchCommentsByPostId = (postId: number) => axios.get(config.apiURL + 'posts/' + postId + "/comments")
    .then(res => {
    return res.data.entities;
})

const postComentInPost = (postId: number, userId: number, contents: String, authTokenId: String) => {
    axios.post(
        config.apiURL + 'posts/' + postId + "/comments", 
        jsonify(contents), 
        headerJsonConfiguration(userId, authTokenId)
        )
    .then(res => {
    return res.data;
    })
}

const updateComment = (
    postId: number,
    commentId: number,
    userId: number,
    authTokenId: string, 
    contents: string) => {
        axios.put(
            config.apiURL + 'posts/' + postId + "/comments/" + commentId, 
            jsonify(contents), 
            headerJsonConfiguration(userId, authTokenId)
            )
        .then(res => {
        return res.data;
        })
    }

export const CommentsAPI = {
    fetchCommentstsByPostId: fetchCommentsByPostId,
    postComentInPost: postComentInPost,
    updateComment: updateComment
};