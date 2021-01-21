import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../Interfaces/interfaces";
import theme from "../../../theme";
import Navbar from "../../Navbar/Nabvar"
import PostTabs from "../../PostTabs/PostTabs";
import PostWriter from "../../PostWriter/PostWriter";

const FeedPage = () => {
    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const history = useHistory();

    useEffect(() => {
        if (sessionUser === null) {
            history.push({
                pathname:  "/"
            });
        }
    });

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
            <div id={"post-area-feed"}>
                <PostWriter isInFeed={true} userId={sessionUser.id}/>
                <Grid container justify="center">
                    <PostTabs isInFeed={true} userId={sessionUser.id}/>
                </Grid>
            </div>
    </ThemeProvider>
    )
}

export default FeedPage;