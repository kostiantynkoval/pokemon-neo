import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {Route, NavLink} from "react-router-dom";
import Dashboard from './Dashboard'
import Details from './Details'

import './App.css'

class App extends Component {
  componentDidMount() {
    // this.props.fetchAllCurrencies()
  }
  
  render() {
    return (
      <Fragment>
        <NavLink exact to="/">
          Dashboard
        </NavLink>
        <NavLink to="/details/1">
          Details
        </NavLink>
        <Route path="/" component={Dashboard}/>
        <Route path="/details/:id" component={Details}/>
      </Fragment>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    fetchAllCurrencies: () => dispatch((() => {})())
  })
)(App);