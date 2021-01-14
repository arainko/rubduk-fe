import { AppBar, Box, Tab, Tabs, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import MyFriends from './MyFriends';


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
          aria-label="simple tabs example"
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary">
            <Tab label="My friends" {...a11yProps(0)} />
            <Tab label="Search" {...a11yProps(1)} />
            <Tab label="Invites" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <MyFriends/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>sss</div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>sss</div>
        </TabPanel>
      </div>
    );
}

export default FriendsTabs;