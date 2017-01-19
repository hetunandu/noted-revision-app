// @flow

import React from 'react'
import { View, Text, Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/LoginHeaderStyle'

export default class LoginHeader extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={Images.wLogo}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    )
  }
}

// // Prop type warnings
// LoginHeader.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// LoginHeader.defaultProps = {
//   someSetting: false
// }
