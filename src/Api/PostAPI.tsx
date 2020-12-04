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

//const postsPostByUserId = (post: any) => axios.post(config.apiURL + 'posts')
    //.then(res => {
  //  return res.data;
//})

export const PostAPI = {
    fetchPosts, fetchPostsByUserId
};