// @flow

import React from 'react'
import { View, Text, Switch, TouchableHighlight } from 'react-native'
import styles from './Styles/SettingRowStyle'

export default class SettingRow extends React.Component {

  render () {
    return (
      <TouchableHighlight
        underlayColor="#D4D4D4"
        onPress={this.props.type === "press" ? () => this.handleSettingPress() : null}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.name}>{this.props.name}</Text>
            {this.props.info && <Text style={styles.info}>{this.props.info}</Text>}
          </View>
          {this.props.type === "toggle" && (
            <Switch
              value={this.props.value}
              onValueChange={(value) => this.handleValueChange(value)}
            />
          )}
        </View>
      </TouchableHighlight>
    )
  }

  handleValueChange(value) {
    this.props.onValueChange(value)
  }

  handleSettingPress() {
    this.props.onPress()
  }
}

// Prop type warnings
SettingRow.propTypes = {
  name: React.PropTypes.string.isRequired,
  info: React.PropTypes.string,
  type: React.PropTypes.string.isRequired
}
//
// // Defaults for props
// SettingRow.defaultProps = {
//   someSetting: false
// }
