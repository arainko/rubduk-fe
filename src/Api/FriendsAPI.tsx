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

        var friends = res.data.entities
        return friends.flatMap((val: { fromUser: any; toUser: any; }) =>
            [val.fromUser, val.toUser]
        )
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
    ).then(res => {
        return res.data.entities;
    })

const fetchIncomingInvites = (token: string) => axios.get(
    config.apiURL + 'friends/pending',
    headerJsonAuthorizationOnly(token)
    ).then(res => {
        return res.data.entities;
    })

const acceptInvite = (inviteId: number, token: string) => axios.post(
    config.apiURL + 'friends/accept/' + inviteId,
    null,
    headerJsonAuthorizationOnly(token)
    ).then(res => {
        return res.data.entities;
    })

const declineInvite = (inviteId: number, token: string) => axios.post(
    config.apiURL + 'friends/reject/' + inviteId,
    null,
    headerJsonAuthorizationOnly(token)
    ).then(res => {
        return res.data.entities;
    })
    

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
    fetchFriends, addFriend, fetchSentInvites, fetchIncomingInvites, acceptInvite, declineInvite
};