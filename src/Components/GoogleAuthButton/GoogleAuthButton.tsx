import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GoogleLogin from 'react-google-login';
import { logIn, setGoogleTokenId, setSessionUser }  from '../Redux/Actions';
import { Redirect } from 'react-router-dom';
import { UserAPI } from '../../Api/UserAPI'

interface RootState {
    isLogged: boolean
}

const GoogleAuthButton = () => {

    const dispatch = useDispatch();
    const redirect = () => {
        return <Redirect to='/target' />;
    }

    const onSuccessLogin = (response: any) => {
        dispatch(logIn())
        dispatch(setGoogleTokenId(response.tokenId))
        UserAPI
            .registerNewUser(response.tokenId)
            .then((data) => {
                dispatch(setSessionUser(data))
            })
        redirect()
    }

    const onFailureLogin = (response: any) => {
        console.log(response.tokenId);
    }
    
    const isLogged = useSelector((state: RootState) => state.isLogged);
    
    return (
        <div>
            <GoogleLogin
                clientId="473547529565-sk3f13t2p7tn2rfc56mbqf4hkqbt80ub.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccessLogin}
                onFailure={onFailureLogin}
                cookiePolicy={'single_host_origin'}
            />
            {isLogged ? <Redirect to="/Feed"></Redirect> : <h3>Click to log in</h3>}
        </div>
    );
};

export default GoogleAuthButton;