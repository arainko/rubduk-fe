import axios from 'axios';
import config from '../appConfig.json'

const jsonify = (friendId: number) => {
    return JSON.stringify({ toUserId: friendId })
}

const fetchFriends = (token: string) => axios.get(
    config.apiURL + 'friends',
    headerJsonAuthorization(token)
    )
    .then(res => {
    return res.data.entities;
})

const addFriend = (friendId: number, token: string) => axios.post(
    config.apiURL + 'friends', 
    jsonify(friendId), 
    headerJsonAuthorization(token)
    )
.then(res => {
return res.data;
})

const fetchSentInvites = (token: string) => axios.get(
    config.apiURL + 'friends/pending/sent',
    headerJsonAuthorizationOnly(token)
)

const headerJsonAuthorizationOnly = (authToken: String) => {
    return {
        headers: {
            'Authorization': authToken
        }
    }
}

const headerJsonAuthorization = (authToken: String) => {
    return {
        headers: {
            'Authorization': authToken,
            'content-type': 'application/json'
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
    fetchFriends, addFriend, fetchSentInvites
};