// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid, Text, View } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.drawerHeader}>Subjects</Text>
        <View style={styles.drawerSection}>
          <DrawerButton text='Economics' onPress={this.handlePressComponents} />
          <DrawerButton text='Maths Formulae' onPress={this.handlePressUsage} />
          <DrawerButton text='OCM' onPress={this.handlePressAPI} />
        </View>
        <DrawerButton text='Coins' onPress={this.handlePressTheme} />
        <DrawerButton text='Settings' onPress={this.handlePressDevice} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
