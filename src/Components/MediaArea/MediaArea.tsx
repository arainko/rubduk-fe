import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { MediaAPI } from '../../Api/MediaAPI';
import { RootState } from '../../Interfaces/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { mediaNotLoaded, setMedia, mediaLoaded } from '../Redux/Actions';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { Typography } from '@material-ui/core';
import ImageDialog from '../Dialogs/ImageDialog/ImageDialog';

interface MediaAreaProps {
    isInFeed: boolean;
    userId: number;
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main,
    },
    gridList: {
        width: 'auto',
        height: 'auto',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}),
);

const MediaArea = (props: MediaAreaProps) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const GoogleTokenId = useSelector((state: RootState) => state.GoogleTokenId);

    const media = useSelector((state: RootState) => state.media);
    const isSpinnerVisible = useSelector((state: RootState) => state.isSpinnerInMedia);

    useEffect(() => {
        dispatch(mediaNotLoaded())
        if (props.isInFeed) {
            MediaAPI
            .fetchMediaByFriends(GoogleTokenId)
            .then(async (data) =>
            {
                await dispatch(setMedia(data))
                dispatch(mediaLoaded())
            })
        } else if (props.userId !== undefined) {
            MediaAPI
            .fetchMediaByUserId(props.userId)
            .then(async (data) =>
                {
                    await dispatch(setMedia(data))
                    dispatch(mediaLoaded())
                })
        }
    }, [props.userId, props.isInFeed, dispatch]);

    const showMediaOrInfo = () => {
        if (media.length === 0) {
            return <Typography>No media to show.</Typography>
        } else {
            return (
                <GridList cellHeight={180} className={classes.gridList}>
                {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">December</ListSubheader>
                </GridListTile> */}
                {media.map((tile: any) => (
                    <GridListTile key={tile.link}>
                        <img src={tile.link} alt={tile.description} />
                        <GridListTileBar
                            title={"added " + (new Date(tile.dateAdded)).toLocaleDateString() + " at " + (new Date(tile.dateAdded)).toLocaleTimeString()}
                            subtitle={<span>{tile.description}</span>}
                            actionIcon={
                                <div>
                                    <ImageDialog isInFeed={props.isInFeed} posterUserId={tile.userId} authToken={GoogleTokenId} imgLink={tile.link} id={tile.mediumId}/>
                                </div>
                            }
                            actionPosition="left"
                        />
                    </GridListTile>
                ))}
            </GridList>
            )
        }
    }

    return (
        <div className={classes.root}>
            {isSpinnerVisible
            ? <LoadingSpinner/>
            : showMediaOrInfo()
            }
        </div>
    );
}

export default MediaArea