import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../theme'
import { CardHeader } from '@material-ui/core';
import Comment from '../Comment/Comment'

const useStyles = makeStyles({
    media: {
        height: 240,
    },
    subheader: {
        color: theme.palette.primary.contrastText
    },
    card: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginBottom: 5
    },
    button: {
        backgroundColor: theme.palette.secondary.dark
    },
});

interface PostProps {
    userName: string,
    userLastName: string,
    contents: string,
    dateAdded: Date
}

export default function Post(props: PostProps) {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader className={classes.subheader} color="white"
                title={props.userName + " " + props.userLastName}
                subheader={"added " + props.dateAdded}
            />
            <CardActionArea>
                {/* <CardMedia
                    className={classes.media}
                    image="https://pm1.narvii.com/6535/615e425e3c9244ab65f07788409cf15b97723718_hq.jpg"
                /> */}
                <CardContent>
                    {/* TODO The title can be empty */}
                    <Typography variant="body2" component="p">
                        {props.contents}
                    </Typography>
                </CardContent>
            </CardActionArea>
        <CardActions>
            <Button size="small" variant="contained" className={classes.button}>
                Like
            </Button>
            <Comment/>
            <Button size="small" variant="contained" className={classes.button}>
                Share
            </Button>
        </CardActions>
        </Card>
    );
}