import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { Link as MaterialLink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetGoogleTokenId, resetSessionUser } from '../Redux/Actions';
import { RootState } from '../../Interfaces/interfaces';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100%-275px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: '275px',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '275px',
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  link: {
    underline: 'none',
    color: 'inherit'
  }
}));


const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const sessionUser = useSelector((state: RootState) => state.sessionUser);

  const getSessionUserOrRedirect = () => {
    if (sessionUser === null) {
      return ''
    } else {
      return sessionUser.id
    }
  }

  return (
    <div className={classes.root}>
      <AppBar color="primary"position="static" className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}>
        <Toolbar>
          <IconButton edge="start" className={clsx(classes.menuButton, open && classes.hide)} color="secondary" aria-label="open drawer"  onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography color="secondary" variant="h3" className={classes.title}>
            <MaterialLink to={'/Feed'} color="secondary" underline="none" component={Link}>RubDuk</MaterialLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer 
        className={classes.drawer} 
        variant="temporary"
        onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose} 
        anchor="left" 
        open={open} 
        classes={{paper: classes.drawerPaper,}}>
        <div className={classes.drawerHeader}>
            <Typography color="secondary" variant="h3" className={classes.title}>
              <MaterialLink to={'/Feed'} color="secondary" underline="none" component={Link}>RubDuk</MaterialLink>
            </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon color="secondary"  /> : <ChevronRightIcon color="secondary" />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key={'Profile'}>
              <ListItemIcon>
                <FaceIcon color="secondary" />
                </ListItemIcon>
              <ListItemText>
                <Typography color="secondary">
                  <MaterialLink to={'/Profile/user=' + getSessionUserOrRedirect()} color="secondary" underline="none" component={Link}>My profile</MaterialLink>
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button key={'Feed'}>
              <ListItemIcon>
                <DynamicFeedIcon color="secondary" />
                </ListItemIcon>
              <ListItemText>
                <Typography color="secondary">
                  <MaterialLink to={'/Feed'} color="secondary" underline="none" component={Link}>Feed</MaterialLink>
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button key={'Logout'}>
              <ListItemIcon>
                <DynamicFeedIcon color="secondary" />
                </ListItemIcon>
              <ListItemText>
                <Typography color="secondary">
                  <MaterialLink to={'/'} 
                  color="secondary" 
                  underline="none" 
                  component={Link} 
                  onClick={() => {
                    dispatch(resetGoogleTokenId())
                    dispatch(resetSessionUser())
                  }}>
                    Log out</MaterialLink>
                </Typography>
              </ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;