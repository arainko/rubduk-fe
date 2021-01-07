import axios from 'axios';
import config from '../appConfig.json'

const jsonToken = (tokenId: String) => {
    return JSON.stringify({ token: tokenId })
}

const headerJsonConfiguration = () => {
    return {
        headers: {
            'content-type': 'application/json'
        }
    }
}

const fetchMediaByUserId = (userId: number) => axios.get(config.apiURL + 'users/' + userId + '/media')
    .then(res => {
    return res.data.entities;
})

export const MediaAPI = {
    fetchMediaByUserId
};