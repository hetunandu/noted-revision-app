// @flow

import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './Styles/CoinsStyle'
import { Images } from '../Themes'

export default class Coins extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.coin} style={styles.coin} />
        <Text
          style={[
            styles.value,
            { color: this.props.dark ? "#333" : "#fff" }
          ]}
        >
          {this.props.value}
        </Text>
      </View>
    )
  }
}

// Prop type warnings
Coins.propTypes = {
  value: React.PropTypes.number.isRequired,
  dark: React.PropTypes.bool
}
//
// // Defaults for props
// Coins.defaultProps = {
//   someSetting: false
// }
