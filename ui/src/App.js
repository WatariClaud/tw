import React, { Component } from "react";

import { Route, Switch } from 'react-router-dom';

import Home from './pages/home';

import Login from './pages/login';

import Feed from './pages/feed';

import "./App.css";

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/feed' component={Feed}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;