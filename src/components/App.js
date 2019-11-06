import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Dashboard from './Dashboard'
import NotFound from './NotFound'

import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/details" />}/>
      <Route path="/details" component={Dashboard}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default App;