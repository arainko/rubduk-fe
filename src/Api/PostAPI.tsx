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

export const PostAPI = {
    fetchPosts, fetchPostsByUserId
};