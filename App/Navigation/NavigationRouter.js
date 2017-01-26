// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import SubjectScreen from '../Containers/SubjectScreen'
import ConceptScreen from '../Containers/ConceptScreen'
import ResultScreen from '../Containers/ResultScreen'
import IndexScreen from '../Containers/IndexScreen'
import Basketball from '../Components/Basketball'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router hideNavBar panHandlers={null}>
        <Scene key='login' component={LoginScreen} panHandlers={null} initial />
        <Scene key='subjects' component={SubjectScreen} type="replace" panHandlers={null}  />
        <Scene
          key="index"
          component={IndexScreen}
          title="Index"
          panHandlers={null}
          hideNavBar={false}
          navigationBarStyle={Styles.navBar}
          titleStyle={Styles.title}
          leftButtonIconStyle={Styles.leftButton}
        />
        <Scene key="concepts" component={ConceptScreen} direction="vertical" panHandlers={null} />
        <Scene key="result" component={ResultScreen} type="replace" panHandlers={null} />
        <Scene key="game" component={Basketball} type="replace" panHandlers={null} />
      </Router>
    )
  }
}

export default NavigationRouter
