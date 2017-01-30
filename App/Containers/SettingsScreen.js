// @flow

import React from 'react'
import { ScrollView, Text, Share, Linking} from 'react-native'
import { connect } from 'react-redux'
import SettingRow from '../Components/SettingRow'
import SettingsActions from '../Redux/SettingsRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import DeviceInfo from 'react-native-device-info'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Communications from 'react-native-communications'


// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends React.Component {

  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <SettingRow
          name="Night mode"
          value={this.props.settings.nightMode}
          onValueChange={(value) => this.handleNightModeValueChange(value)}
          type="toggle"
        />
        <SettingRow
          onPress={() => this.handleShare()}
          name="Share with friends"
          type="press"
        />
        <SettingRow
          onPress={() => this.handleReview()}
          name="Review on Playstore"
          type="press"
        />
        <SettingRow
          onPress={() => this.handleReportIssue()}
          name="Report app issue"
          type="press"
        />
        <SettingRow
          name="App Version"
          info={DeviceInfo.getVersion()}
          type="none"
        />
      </ScrollView>
    )
  }

  handleNightModeValueChange(value) {
    this.props.setNightMode(value)
  }

  handleShare() {
    Share.share({
        message: `I have been revising from this awesome app and it has been helping me a lot. You can download it too from https://play.google.com/store/apps/details?id=study.noted.app&hl=en&utm_source=share&utm_medium=app`,
        title: 'Download this app!'
      },{
        dialogTitle: 'Share'
      })
  }

  handleReview() {
    Linking.openURL("market://details?id=study.noted.app")
  }

  handleReportIssue() {
    Communications.email("hetu.nandu@noted.study", null, null, "Issue with Noted", "Type your issue here....")
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNightMode: (value) => dispatch(SettingsActions.setNightMode(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
