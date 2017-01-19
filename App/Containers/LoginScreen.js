// @flow
// Basic imports
import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View } from 'react-native'
import { connect } from 'react-redux'
// Components
import LoginHeader from '../Components/LoginHeader';
import GoogleLoginButton from '../Components/GoogleLoginButton';

// Actions
// import YourActions from '../Redux/YourRedux'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/LoginScreenStyle'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class LoginScreen extends React.Component {

  signInWithGoogle(){
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user)
       // this.props.onGoogleLogin(user.idToken)
      })
      .catch((err) => {
        console.warn(err)
      })
      .done();
  }

  render () {
    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        <LoginHeader />
        <GoogleLoginButton onLoginPress={() => this.signInWithGoogle()}/>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
