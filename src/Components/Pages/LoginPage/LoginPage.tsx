import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../../../theme";
import GoogleAuthButton from "../../GoogleAuthButton/GoogleAuthButton";

const LoginPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GoogleAuthButton/>
        </ThemeProvider>
    )
}

export default LoginPage; 