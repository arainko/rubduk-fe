import {makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import GoogleAuthButton from "../../GoogleAuthButton/GoogleAuthButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid"
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => ({
    link: {
        underline: 'none',
        color: 'inherit'
    },
    title: {
        flexGrow: 1,
        color:'secondary',
    },
    root:{
        flexGrow:1,
    },
    item:{
        overflowWrap: "break-word",
    },
    view:{
        width:'60vh',
        paddingLeft:'20vh',
    },
    typo:{
      align:"center",
      color:theme.palette.primary.contrastText,
    },
}));

const LoginPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
                    <Typography color="secondary" variant="h1" >
                        <Link href="/" underline="none" className={classes.link}>
                            {'RubDuk'}
                        </Link>
                    </Typography>
            <Grid container spacing={2} className={classes.root} xs={12} justify="space-evenly">
                        <Grid item className={classes.view} alignContent="center">
                            <Paper className={classes.item}>
                                <Typography variant="h3" className={classes.typo}>Connecting People since 2020 maybe somthing intresting and blablablablablablablablablablablabla</Typography>
                            </Paper>
                        </Grid>
                         <Grid item className={classes.view}>
                             <Paper className={classes.item}>
                                 <Typography align="center" variant="h3" color="secondary">Welcome</Typography>
                                 <Typography variant="h4" className={classes.typo}>Please log in with Google to continue</Typography>
                                 <Typography className={classes.typo}>
                                     <GoogleAuthButton/>
                                 </Typography>
                             </Paper>
                        </Grid>

            </Grid>
        </div>
    )
}

export default LoginPage; 