// @flow

import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import SubjectScreen from '../Containers/SubjectScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene initial key='login' component={LoginScreen}  hideNavBar />
        <Scene key='subjects' component={SubjectScreen} type="replace" hideNavBar  />
      </Router>
    )
  }
}

export default NavigationRouter
