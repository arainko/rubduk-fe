import axios from 'axios';
import config from '../appConfig.json'

const fetchCommentstsByPostId = (postId: number) => axios.get( config.apiURL + 'posts/' + postId + "/comments")
    .then(res => {
    return res.data.entities;
})

export const CommentsAPI = {
    fetchCommentstsByPostId
};