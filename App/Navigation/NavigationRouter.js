// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import { Images } from '../Themes'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import SubjectScreen from '../Containers/SubjectScreen'
import ConceptScreen from '../Containers/ConceptScreen'
import ResultScreen from '../Containers/ResultScreen'
import IndexScreen from '../Containers/IndexScreen'
import CoinsScreen from '../Containers/CoinsScreen'
import Basketball from '../Components/Basketball'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router
        hideNavBar
        panHandlers={null}
        navigationBarStyle={Styles.navBar}
        titleStyle={Styles.title}
        leftButtonIconStyle={Styles.leftButton}
        backButtonImage={Images.backIcon}
      >
        <Scene key='login' component={LoginScreen} panHandlers={null} initial />
        <Scene key='subjects' component={SubjectScreen} type="replace" panHandlers={null} hideNavBar />
        <Scene key="index" component={IndexScreen} title="Index" panHandlers={null} hideNavBar={false} />
        <Scene key="concepts" component={ConceptScreen} direction="vertical" panHandlers={null} hideNavBar />
        <Scene key="result" component={ResultScreen} type="replace" panHandlers={null} hideNavBar />
        <Scene key="coins" component={CoinsScreen} panHandlers={null} title="Coins" hideNavBar={false} />
        <Scene key="game" component={Basketball} type="replace" panHandlers={null} hideNavBar />
      </Router>
    )
  }
}

export default NavigationRouter
