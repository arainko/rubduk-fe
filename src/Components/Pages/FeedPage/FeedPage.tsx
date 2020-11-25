import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"

const FeedPage = () => {
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
    </ThemeProvider>
    )
}

export default FeedPage;