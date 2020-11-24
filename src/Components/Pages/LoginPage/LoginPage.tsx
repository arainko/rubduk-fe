import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../../../theme";
import GoogleAuthButton from "../../GoogleAuthButton/GoogleAuthButton";

export default function LoginPage() {
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleAuthButton/>
    </ThemeProvider>
    )
}