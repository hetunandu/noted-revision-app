// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/StatusCounterStyle'

export default class StatusCounter extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>{this.props.value}</Text>
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    )
  }
}

// Prop type warnings
StatusCounter.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired
}
//
// // Defaults for props
// StatusCounter.defaultProps = {
//   someSetting: false
// }
