import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"
import FeedArea from "../../FeedArea/FeedArea";

const FeedPage = () => {
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <FeedArea />
    </ThemeProvider>
    )
}

export default FeedPage;