import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GoogleLogin from 'react-google-login';
import { logIn, setGoogleTokenId, setSessionUser }  from '../Redux/Actions';
import { Redirect } from 'react-router-dom';
import { UserAPI } from '../../Api/UserAPI'
import { RootState } from '../../Interfaces/interfaces';

const GoogleAuthButton = () => {

    const dispatch = useDispatch();

    const onSuccessLogin = (response: any) => {
        dispatch(logIn())
        dispatch(setGoogleTokenId(response.tokenId))
        UserAPI
            .registerNewUser(response.tokenId)
            .then(async (data) => {
                await dispatch(setSessionUser(data))
            })
    }

    const onFailureLogin = (response: any) => {
        console.log(response.tokenId);
    }
    
    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    
    return (
        <div>
            <GoogleLogin
                clientId="473547529565-sk3f13t2p7tn2rfc56mbqf4hkqbt80ub.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccessLogin}
                onFailure={onFailureLogin}
                cookiePolicy={'single_host_origin'}
            />
            {sessionUser ? <Redirect to="/Feed"></Redirect> : <div></div>}
        </div>
    );
};

export default GoogleAuthButton;