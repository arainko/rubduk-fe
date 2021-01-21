import { createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import theme from "../../../theme";
import GoogleAuthButton from "../../GoogleAuthButton/GoogleAuthButton";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        flexGrow: 1,
        marginTop: 200
        },
        paper: {
            minWidth: 200,
        },
        control: {
            padding: theme.spacing(2),
        },
        banner: {
            color: theme.palette.secondary.main,
            marginTop: 20,
            marginLeft: 2,
            textAlign: "left"
        },
        button: {
            marginTop: 20
        },
        desc: {
            color: theme.palette.secondary.main,
            textAlign: "center"
        },
    }),
);

const LoginPage = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography variant="h2" className={classes.banner}>RUBDUK</Typography>
            <Grid container justify="center" className={classes.root}>
                <Grid key={"desc"} item>
                    <Typography variant="h6" className={classes.desc}>Here You cant post posts (yay) and media. Create Your account instantly with the button!</Typography>
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes.button}>
                    <GoogleAuthButton/>
            </Grid>
        </ThemeProvider>
    )
}

export default LoginPage; 