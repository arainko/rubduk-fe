import axios from 'axios';
import config from '../appConfig.json'

const fetchCommentsByPostId = (postId: number) => axios.get( config.apiURL + 'posts/' + postId + "/comments")
    .then(res => {
    return res.data.entities;
})

const postComentInPost = (postId: number, userId: number, contents: String, authTokenId: number) => {
    console.log();
}

export const CommentsAPI = {
    fetchCommentstsByPostId: fetchCommentsByPostId
};