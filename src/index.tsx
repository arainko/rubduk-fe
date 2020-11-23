import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Navbar from './Components/Navbar/Nabvar';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import UserProfile from './Components/UserProfile/UserProfile';

import { useGoogleLogin } from 'react-google-login'
import { GoogleLogin } from 'react-google-login';
import GoogleAuthButton from './Components/GoogleAuthButton/GoogleAuthButton';


const responseGoogle = (response: any) => {
    console.log(response.tokenId);
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navbar />
  </ThemeProvider>,
  document.getElementById('navbar'),
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserProfile />
    <GoogleAuthButton />
  </ThemeProvider>,
  document.getElementById('user-info'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
