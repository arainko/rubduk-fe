import axios from 'axios';
import config from '../appConfig.json'

const jsonify = (text: string, base64media: string) => {
    return JSON.stringify({
        base64Image: base64media.replace("data:image/jpeg;base64,", ""),
        description: text 
    })
}

const headerJsonConfiguration = (authToken: string) => {
    return {
        headers: {
            'Authorization': authToken,
            'content-type': 'application/json'
        }
    }
}

const headerJsonAuthorization = (authToken: string) => {
    return {
        headers: {
            'Authorization': authToken
        }
    }
}

const deleteMedia = (mediumId: number, authTokenId: string) =>
    axios.delete(
        config.apiURL + 'users/media/' + mediumId, 
        headerJsonAuthorization(authTokenId)
        )
    .then(res => {
    return res.data;
    })

const fetchMediaByUserId = (userId: number) => axios.get(config.apiURL + 'users/' + userId + '/media')
    .then(res => {
    return res.data.entities;
})

const fetchMediaByFriends = (token: string) => axios.get(
    config.apiURL + 'feed/media',
    headerJsonAuthorization(token)
    )
    .then(res => {
    return res.data.entities;
})

const postMediaByUserToken = (token: string, base64media: string, description?: any) => axios.post(
    config.apiURL + 'users/media', 
    jsonify(description, base64media),
    headerJsonConfiguration(token)
    )
    .then(res => {
    return res.data;
})

const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export const MediaAPI = {
    fetchMediaByUserId, postMediaByUserToken, fetchMediaByFriends, convertToBase64, deleteMedia
};