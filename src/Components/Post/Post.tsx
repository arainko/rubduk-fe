import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../theme'
import { CardHeader, IconButton, Menu } from '@material-ui/core';
import CommentsModal from '../CommentsModal/CommentsModal';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useSelector } from 'react-redux';
import { PostProps, RootState } from '../../Interfaces/interfaces';
import EditDialog from '../Dialogs/EditDialog/EditDialog';
import DeleteDialog from '../Dialogs/DeleteDialog/DeleteDialog';
import { PostAPI } from '../../Api/PostAPI';

const useStyles = makeStyles({
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

const Post = (props: PostProps) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
    const [likes, setLikes] = React.useState(props.likes);
    const classes = useStyles();

    const showMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const showAction = () => {
        if (props.userId === sessionUser.id) {
            return (
                <IconButton aria-controls="simple-menu" aria-label="settings" aria-haspopup="true" color="secondary" onClick={showMenu}>
                    <MoreVertIcon />
                </IconButton>
            )
        } else {
            return (<div></div>)
        }
    }

    const likePost = () => {
        PostAPI
        .likePost(props.postId, GoogleTokenId)
        .then((data) => {
            alert("Post liked!")
            setLikes(likes + 1)
        })
        .catch((error: any) => alert(error.response.data))
    }

    const unlikePost = () => {
        PostAPI
        .unlikePost(props.postId, GoogleTokenId)
        .then((data) => {
            alert("Post unliked!")
            setLikes(likes - 1)
        })
        .catch((error: any) => alert(error.response.data))
    }

    return (
        <Card className={classes.card}>
            <CardHeader 
                className={classes.subheader} color="white"
                title={props.userName + " " + props.userLastName}
                subheader={"added " + props.dateAdded}
                action={
                    showAction()
                }
            />
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" component="p">
                        {props.contents}
                    </Typography>
                </CardContent>
            </CardActionArea>
        <CardActions>
            <Button size="small" variant="contained" className={classes.button} onClick={likePost}>
                Like
            </Button>
            <Button size="small" variant="contained" className={classes.button} onClick={unlikePost}>
                Unlike
            </Button>
            <CommentsModal postId={props.postId} userId={props.userId}/>
            <Typography>
                Liked by {likes}
            </Typography>
        </CardActions>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <EditDialog isInFeed={props.isInFeed} isPost={true} postId={props.postId} userId={sessionUser.id} authToken={GoogleTokenId} contents={props.contents} commentId={0}/>
            <DeleteDialog isPost={true} objectId={props.postId} isInFeed={props.isInFeed} userId={props.userId} authToken={GoogleTokenId}/>
        </Menu>
        </Card>
    );
}

export default Post;