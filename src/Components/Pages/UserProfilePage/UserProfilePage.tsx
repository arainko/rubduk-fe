import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"
import UserProfile from "../../UserProfile/UserProfile";

interface RouteInfo {
    userId: string;
}

export default function UserProfilePage({ match } : RouteComponentProps<RouteInfo> ) {

    const { params } = match;
    const userId = +params.userId;
    console.log("test " + params.userId)

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <UserProfile userId={userId}/>
    </ThemeProvider>
    )
}