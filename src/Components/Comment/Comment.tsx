import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import {Card, CardContent, CardHeader, IconButton, Menu} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useSelector } from 'react-redux';
import { RootState } from '../../Interfaces/interfaces';
import EditDialog from '../Dialogs/EditDialog/EditDialog';
import DeleteDialog from '../Dialogs/DeleteDialog/DeleteDialog';

const useStyles = makeStyles({
    comment: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        overflowWrap: "break-word"
    },
    commentOwner: {
        color: theme.palette.secondary.dark,
        paddingLeft:5,
    },
    whole: {
        backgroundColor: theme.palette.primary.light,
        margin:5,
    }
});

interface CommentProps {
    dateAdded: Date,
    userName: String,
    userLastName: String,
    commentId: number,
    contents: string,
    postId: number,
    userId: number
}

const Comment = (props: CommentProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const sessionUser = useSelector((state: RootState) => state.sessionUser);
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);
    
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

    return (
        <Card className={classes.whole}>
            <CardHeader
            title={props.userName + " " + props.userLastName}
            subheader={"added " + props.dateAdded}
            action={
                showAction()
            }
            />
            <CardContent>
                <Typography className={classes.comment} variant="body2" component="p">
                    {props.contents}
                </Typography>
            </CardContent>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <EditDialog isPost={false} postId={props.postId} userId={props.userId} authToken={GoogleTokenId} contents={props.contents} commentId={props.commentId}/>
                <DeleteDialog isPost={false} objectId={props.commentId} userId={props.userId} authToken={GoogleTokenId}/>
            </Menu>
        </Card>
    )

}
export default Comment;