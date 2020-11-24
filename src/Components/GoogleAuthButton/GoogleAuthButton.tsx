import React from 'react';
import {useSelector} from 'react-redux';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response: any) => {
    console.log(response.tokenId);
}

const GoogleAuthButton = (): JSX.Element => {
    return (
        <GoogleLogin
            clientId="473547529565-sk3f13t2p7tn2rfc56mbqf4hkqbt80ub.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleAuthButton;