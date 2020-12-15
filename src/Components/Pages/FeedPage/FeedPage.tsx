import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"
import PostArea from "../../PostArea/PostArea";

const FeedPage = () => {
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Grid container justify="center">
            <PostArea isInFeed={true}/>
        </Grid>
    </ThemeProvider>
    )
}

export default FeedPage;