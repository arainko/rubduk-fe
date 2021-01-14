import axios from 'axios';
import config from '../appConfig.json'

const fetchFriends = () => axios.get(config.apiURL + 'users')
    .then(res => {
    return res.data.entities;
})

//TODO this is mock data, needs to be real friends

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

export const FriendsAPI = {
    fetchFriends
};