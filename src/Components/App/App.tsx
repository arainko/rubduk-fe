import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from '../LoginPage/LoginPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import NotFoundErrorPage from '../NotFoundErrorPage/NotFoundErrorPage'
import './App.css';
import FeedPage from '../FeedPage/FeedPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/profile" component={UserProfilePage} />
        <Route path="/feed" component={FeedPage} />
        <Route component={NotFoundErrorPage} />
      </Switch>
    </Router>
  );
}