// @flow

import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import styles from './Styles/LoadingStyle'
import { Colors } from '../Themes'


export default class Loading extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size="large"
          color="red"
        />
      </View>
    )
  }
}

// // Prop type warnings
// Loading.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Loading.defaultProps = {
//   someSetting: false
// }
