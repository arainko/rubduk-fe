import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GoogleLogin from 'react-google-login';
import { logIn }  from '../Redux/Actions';

interface RootState {
    isLogged: boolean
}

const GoogleAuthButton = () => {

    const responseGoogle = (response: any) => {
        console.log(response.tokenId);
    }
    
    const isLogged = useSelector((state: RootState) => state.isLogged);
    
    const dispatch = useDispatch();
    
    return (
        <div>
            <GoogleLogin
                clientId="473547529565-sk3f13t2p7tn2rfc56mbqf4hkqbt80ub.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <button onClick={() => dispatch(logIn())}></button>
            {isLogged ? <h3>You are now logged in</h3> : <h3>Click to log in</h3>}
        </div>
    );
};

export default GoogleAuthButton;