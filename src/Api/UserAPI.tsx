import axios from 'axios';
import config from '../appConfig.json'

const fetchUserWithId = (userId: number) => axios.get( config.apiURL + 'users/' + userId)
    .then(res => {
    return res.data;
})

export const UserAPI = {
    fetchUserWithId,
};