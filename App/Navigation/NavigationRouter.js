// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import SubjectScreen from '../Containers/SubjectScreen'
import ConceptScreen from '../Containers/ConceptScreen'
import ResultScreen from '../Containers/ResultScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router hideNavBar>
        <Scene initial key='login' component={LoginScreen}  />
        <Scene key='subjects' component={SubjectScreen} type="replace"  />
        <Scene key="concepts" component={ConceptScreen} direction="vertical"  />
        <Scene key="result" component={ResultScreen} />
      </Router>
    )
  }
}

export default NavigationRouter
