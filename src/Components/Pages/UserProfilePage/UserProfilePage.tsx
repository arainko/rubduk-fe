import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { RootState } from "../../../Interfaces/interfaces";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"
import UserProfile from "../../UserProfile/UserProfile";
import { Snackbar } from '@material-ui/core';
import { useSnackbar } from "../../UseSnackBar/useSnackbar";

interface RouteInfo {
    userId: string;
}

export default function UserProfilePage({ match } : RouteComponentProps<RouteInfo> ) {

    const { params } = match;
    const userId = +params.userId;

    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const history = useHistory();
    const snackBar = useSnackbar();

    useEffect(() => {
        if (sessionUser === null || sessionUser === undefined || userId === null) {
            history.push({
                pathname:  "/"
            });
        }
    });

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {sessionUser === null || sessionUser === undefined || userId === null
            ? history.push({
                pathname:  "/"
            })
            : <UserProfile 
                userId={userId} 
                isSessionUser={sessionUser.id === userId
                ? true
                : false
                } 
                sessionUserId={sessionUser.id}/>
        }
        <Snackbar {...snackBar}/>
    </ThemeProvider>
    )
}