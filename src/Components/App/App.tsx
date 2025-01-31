import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from '../Pages/LoginPage/LoginPage';
import UserProfilePage from '../Pages/UserProfilePage/UserProfilePage';
import NotFoundErrorPage from '../Pages/NotFoundErrorPage/NotFoundErrorPage'
import './App.css';
import FeedPage from '../Pages/FeedPage/FeedPage';
import FriendsPage from '../Pages/FriendsPage/FriendsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={LoginPage} exact />
        <Route path='/profile/user=:userId' component={UserProfilePage}/>
        <Route path='/friends' component={FriendsPage} />
        <Route path='/feed' component={FeedPage} />
        <Route component={NotFoundErrorPage} />
      </Switch>
    </Router>
  );
}

export default App