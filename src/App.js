import React, { Component } from 'react';

/**
 * here have to implement all t
 */
import Dashboard from './Containers/Dashboard';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const sample_routers = () => {
  return [
    {key: 'dashboard', path: '/', component: Dashboard},
  ]
}
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {sample_routers().map(item => <Route exact {...item}/>)}
        </Switch>
      </Router>
    );
  }
}

export default App;