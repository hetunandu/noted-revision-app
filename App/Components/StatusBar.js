// @flow

import React from 'react'
import { View, Text, TouchableHighlight} from 'react-native'
import styles from './Styles/StatusBarStyle'
import Coins from './Coins'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'

export default class StatusBar extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        {this.props.pro === true ? (
          <View>
            <Text style={styles.viewsCounterText}>PRO Student</Text>
          </View>
        ):(
            <View style={styles.viewsCounter}>
              <Icon name="visibility" color="#fff" size={20} style={{padding: 5}}/>
              <Text style={styles.viewsCounterText}>
                {this.props.session.views}
              </Text>
            </View>
        )}

        {!this.props.pro && (
          <TouchableHighlight
            underlayColor={Colors.notedBlueDarker}
            onPress={() => this.handleCoinBalancePress()}
          >
            <View>
              <Coins value={this.props.coins.balance} />
            </View>
          </TouchableHighlight>
        )}

        <TouchableHighlight
          underlayColor={Colors.notedBlueDarker}
          onPress={() => this.handleSettingsPress()}
        >
          <Icon name="settings" color="#fff" size={25}/>
        </TouchableHighlight>

      </View>
    )
  }

  handleCoinBalancePress() {
    NavigationActions.coins()
  }

  handleSettingsPress() {
    NavigationActions.settings()
  }
}

// Prop type warnings
StatusBar.propTypes = {
  session: React.PropTypes.object,
  coins: React.PropTypes.object,
  pro: React.PropTypes.bool
}
//
// // Defaults for props
// StatusBar.defaultProps = {
//   someSetting: false
// }
