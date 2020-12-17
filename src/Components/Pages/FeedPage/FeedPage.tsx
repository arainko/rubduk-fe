import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interfaces/interfaces";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"
import PostArea from "../../PostArea/PostArea";

const FeedPage = () => {
    const sessionUser = useSelector((state: RootState) => state.sessionUser);

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Grid container justify="center">
            <PostArea isInFeed={true} userId={sessionUser.id}/>
        </Grid>
    </ThemeProvider>
    )
}

export default FeedPage;