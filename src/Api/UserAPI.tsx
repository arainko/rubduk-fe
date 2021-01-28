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

const headerJsonAuthorization = (authToken: String) => {
    return {
        headers: {
            'Authorization': authToken
        }
    }
}

const deleteAccount = (token: string) => axios.delete(
    config.apiURL + 'users/me',
    headerJsonAuthorization(token)
    )
    .then(res => {
    return res.data;
})

const getById = (id: number) => axios.get(
    config.apiURL + 'users/' + id,
    )
    .then(res => {
    return res.data;
})

const searchUsersByName = (token: string, query: string) => axios.get(
    config.apiURL + 'users?name=' + query,
    headerJsonAuthorization(token)
    )
    .then(res => {
    return res.data.entities;
})

const fetchUserWithId = (userId: number) => axios.get(config.apiURL + 'users/' + userId)
    .then(res => {
    return res.data;
})

const registerNewUser = (tokenId: String) => axios.post(
        config.apiURL + 'users/login', 
        jsonToken(tokenId), 
        headerJsonConfiguration()
        )
    .then(res => {
    return res.data;
})

export const UserAPI = {
    fetchUserWithId, registerNewUser, searchUsersByName, deleteAccount, getById
};