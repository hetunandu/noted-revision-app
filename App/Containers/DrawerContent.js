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

  handleSubjectPress(subject)  {
    this.toggleDrawer()
    console.tron.log(subject)
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
  
   // console.tron.log(this.props.subjects.list)

    return (
      <ScrollView style={styles.container}>
        {
          this.props.user ? (
            <View style={styles.profileContainer}>
              <View>
                <Image 
                  source={{uri: this.props.user.picture_uri}}
                  style={styles.profileImg}
                />
              </View>
              <View>
                <Text style={styles.userName}>
                  {this.props.user.name}
                </Text>
                <Text>{this.props.user.points} coins</Text>
              </View>
            </View>
          ) : (null)
        }
        <Text style={styles.drawerHeader}>Subjects</Text>
            <View style={styles.drawerSection}>
            {this.props.subjects.fetching && <Text>Loading</Text>}
            {this.props.subjects.list.map(subject => {
              return(
                <DrawerButton
                  key={subject.key}
                  text={`${subject.name} (${subject.views_available})`}
                  onPress={() => this.handleSubjectPress(subject)}
                />
              )
            })}
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
