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
import Link from '@material-ui/core/Link';

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

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            <Link href="/" underline="none" className={classes.link}>
              {'RubDuk'}
            </Link>
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
              <Link href="/" underline="none" className={classes.link}>
                {'RubDuk'}
              </Link>
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
                  <Link href="/Profile" underline="none" className={classes.link}>
                    {'Profile'}
                  </Link>
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button key={'Feed'}>
              <ListItemIcon>
                <DynamicFeedIcon color="secondary" />
                </ListItemIcon>
              <ListItemText>
                <Typography color="secondary">
                  <Link href="/Feed" underline="none" className={classes.link}>
                    {'Feed'}
                  </Link>
                </Typography>
              </ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
