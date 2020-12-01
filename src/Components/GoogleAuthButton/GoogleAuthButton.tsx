import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GoogleLogin from 'react-google-login';
import { logIn, setGoogleTokenId }  from '../Redux/Actions';
import { Link, Redirect } from 'react-router-dom';

interface RootState {
    isLogged: boolean
}

const GoogleAuthButton = () => {

    const dispatch = useDispatch();
    const redirect = () => {
        return <Redirect to='/target' />;
    }

    const onSuccessLogin = (response: any) => {
        console.log(response);
        console.log(response.tokenId);
        dispatch(logIn())
        dispatch(setGoogleTokenId(response.tokenId))
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