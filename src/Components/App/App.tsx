import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from '../Pages/LoginPage/LoginPage';
import UserProfilePage from '../Pages/UserProfilePage/UserProfilePage';
import NotFoundErrorPage from '../Pages/NotFoundErrorPage/NotFoundErrorPage'
import './App.css';
import FeedPage from '../Pages/FeedPage/FeedPage';

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