// @flow

import React from 'react'
import { ScrollView, Text, Share, Linking} from 'react-native'
import { connect } from 'react-redux'
import SettingRow from '../Components/SettingRow'
import SettingsActions from '../Redux/SettingsRedux'
import DeviceInfo from 'react-native-device-info'
import Communications from 'react-native-communications'
import styles from './Styles/SettingsScreenStyle'
import { tracker } from '../Lib/googleAnalytics'

class SettingsScreen extends React.Component {

  componentDidMount() {
    tracker.trackScreenView('Settings');
  }

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

    tracker.trackEvent('Settings', 'Share app')

  }

  handleReview() {
    Linking.openURL("market://details?id=study.noted.app")
    tracker.trackEvent('Settings', 'Review App')
  }

  handleReportIssue() {
    Communications.email("hetu.nandu@noted.study", null, null, "Issue with Noted", "Type your issue here....")
    tracker.trackEvent('Settings', 'Report Issue')

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
