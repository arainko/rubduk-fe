import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { RootState } from "../../../Interfaces/interfaces";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"
import UserProfile from "../../UserProfile/UserProfile";

interface RouteInfo {
    userId: string;
}

export default function UserProfilePage({ match } : RouteComponentProps<RouteInfo> ) {

    const { params } = match;
    const userId = +params.userId;

    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const history = useHistory();

    useEffect(() => {
        if (sessionUser === null || userId === null) {
            history.push({
                pathname:  "/"
            });
        }
    });

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <UserProfile userId={userId}/>
    </ThemeProvider>
    )
}