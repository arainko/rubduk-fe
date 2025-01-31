import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PostArea from '../PostArea/PostArea';
import MediaArea from '../MediaArea/MediaArea';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface PostTabsProps {
  isInFeed: boolean;
  userId: number;
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

const PostTabs = (props: PostTabsProps) => {
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
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Media" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PostArea isInFeed={props.isInFeed} userId={props.userId}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MediaArea isInFeed={props.isInFeed} userId={props.userId}/>
      </TabPanel>
    </div>
  );
}

export default PostTabs