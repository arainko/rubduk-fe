import axios from 'axios';

const allPostsUrl = 'http://localhost:8080/api/posts'

const fetchPosts = () => axios.get(allPostsUrl)
    .then(res => {
    return res.data.entities;
})

export const PostAPI = {
    fetchPosts,
};