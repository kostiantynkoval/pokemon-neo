import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {Switch, Route, Redirect} from "react-router-dom";
import Dashboard from './Dashboard'
import Details from './Details'
import NotFound from './NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/details"/>}/>
    <Route path="/details" component={Dashboard}/>
    {/*<Route path="/details/:id" component={Details}/>*/}
    <Route component={NotFound}/>
  </Switch>
)

export default App;