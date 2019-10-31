import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {Route, Redirect} from "react-router-dom";
import Dashboard from './Dashboard'
import Details from './Details'
import NotFound from './NotFound'

import './App.css'

const App = () => (
  <Fragment>
    <Route path="/" exact render={() => <Redirect to="/details"/>}/>
    <Route path="/details" component={Dashboard}/>
    <Route path="/details/:id" component={Details}/>
    <Route path="/not-found" component={NotFound}/>
  </Fragment>
)

export default App;