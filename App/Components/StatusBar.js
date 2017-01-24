// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/StatusBarStyle'

export default class StatusBar extends React.Component {

  render () {
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.viewsCounterText}>
          {this.props.session.views} views
        </Text>
        <Text
          style={styles.coinsCounterText}
        >
          {this.props.coins} coins
        </Text>
      </View>
    )
  }
}

// // Prop type warnings
// StatusBar.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// StatusBar.defaultProps = {
//   someSetting: false
// }
