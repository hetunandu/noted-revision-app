// @flow

import React from 'react'
import { View, Text } from 'react-native'
import {GoogleSigninButton} from 'react-native-google-signin';
import styles from './Styles/GoogleLoginButtonStyle'


export default class GoogleLoginButton extends React.Component {
  propsTypes = {
    onLoginPress: React.PropTypes.func.isRequired
  }

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
