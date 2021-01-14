import { CssBaseline, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import theme from '../../../theme';
import Grid from '@material-ui/core/Grid';
import Navbar from '../../Navbar/Nabvar';
import Link from '@material-ui/core/Link/Link';
import { RouteComponentProps } from 'react-router-dom';
import FriendsTabs from '../../Friends/FriendsTabs';


const FriendsPage = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <div id={"friends-area"}>
                <FriendsTabs/>
            </div>
        </ThemeProvider>
    );
}

export default FriendsPage