import axios from 'axios';
import config from '../appConfig.json'

const fetchFriends = (token: string) => axios.get(
    config.apiURL + 'friends',
    headerJsonAuthorization(token)
    )
    .then(res => {
    return res.data.entities;
})

const jsonify = (text: String) => {
    return JSON.stringify({ contents: text })
}

const headerJsonAuthorization = (authToken: String) => {
    return {
        headers: {
            'Authorization': authToken
        }
    }
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