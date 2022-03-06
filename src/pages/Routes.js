import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/" component={ Login } exact />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
