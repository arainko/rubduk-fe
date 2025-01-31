import { AppBar, Box, Tab, Tabs, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import IncomingInvites from './IncomingInvites';
import MyFriends from './MyFriends';
import SearchFriendsArea from './SearchFriendsArea';
import SentInvites from './SentInvites';


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box bgcolor="primary.main">
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const FriendsTabs = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} 
          onChange={handleChange} 
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary">
            <Tab label="My friends" {...a11yProps(0)} />
            <Tab label="Search" {...a11yProps(1)} />
            <Tab label="Incoming invites" {...a11yProps(2)} />
            <Tab label="Sent invites" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <MyFriends/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SearchFriendsArea/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <IncomingInvites/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SentInvites/>
        </TabPanel>
      </div>
    );
}

export default FriendsTabs;