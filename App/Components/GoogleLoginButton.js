// @flow

import React from 'react'
import { View, Text } from 'react-native'
import {GoogleSigninButton} from 'react-native-google-signin';
import styles from './Styles/GoogleLoginButtonStyle'

type GoogleLoginButtonProps = {
  onLoginPress: () => void
}

export default class GoogleLoginButton extends React.Component {
  props: GoogleLoginButtonProps

  render () {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 230, height: 48, alignSelf: 'center'}}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.props.onLoginPress()}
        />
      </View>
    )
  }
}

// // Prop type warnings
// GoogleLoginButton.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// GoogleLoginButton.defaultProps = {
//   someSetting: false
// }
