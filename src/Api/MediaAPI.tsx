import axios from 'axios';
import config from '../appConfig.json'

const jsonify = (text: string, base64media: string) => {
    return JSON.stringify({
        base64Image: base64media,
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

const fetchMediaByUserId = (userId: number) => axios.get(config.apiURL + 'users/' + userId + '/media')
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
    fetchMediaByUserId, postMediaByUserToken, convertToBase64
};