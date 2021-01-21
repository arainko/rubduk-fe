import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import theme from '../../../theme';
import Navbar from '../../Navbar/Nabvar';
import { useHistory } from 'react-router-dom';
import FriendsTabs from '../../Friends/FriendsTabs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Interfaces/interfaces';


const FriendsPage = () => {

    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const history = useHistory();

    useEffect(() => {
        if (sessionUser === null) {
            history.push({
                pathname:  "/"
            });
        }
    });

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