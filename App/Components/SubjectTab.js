// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/SubjectTabStyle'

export default class SubjectTab extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.subject.name}</Text>
      </View>
    )
  }
}

// // Prop type warnings
// SubjectTab.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// SubjectTab.defaultProps = {
//   someSetting: false
// }
