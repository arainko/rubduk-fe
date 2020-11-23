import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../../theme";
import Navbar from "../Navbar/Nabvar"
import UserProfile from "../UserProfile/UserProfile";

export default function UserProfilePage() {
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <UserProfile />
    </ThemeProvider>
    )
}