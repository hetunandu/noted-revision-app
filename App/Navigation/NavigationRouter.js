// @flow

import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'

// screens identified by the router
import WelcomeScreen from '../Containers/WelcomeScreen'
import LoginScreen from '../Containers/LoginScreen'
import SubjectScreen from '../Containers/SubjectScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='login' component={LoginScreen} title='Login' hideNavBar />
            <Scene key='welcome' component={WelcomeScreen} title='Welcome' renderLeftButton={NavItems.hamburgerButton} type={ActionConst.REPLACE} hideNavBar={false} />
            <Scene key='subject' component={SubjectScreen} renderLeftButton={NavItems.hamburgerButton} type={ActionConst.REPLACE} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
