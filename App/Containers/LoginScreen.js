// @flow
// Basic imports
import React from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
// Components
import LoginHeader from '../Components/LoginHeader';
import GoogleLoginButton from '../Components/GoogleLoginButton';
import Loading from '../Components/Loading';

// Actions
import LoginActions from '../Redux/LoginRedux'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends React.Component {

  componentDidMount(){
    this.googleLoginInit()
  }

  googleLoginInit(){
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        GoogleSignin.configure({
          webClientId: '865864307125-gob0frva3ifb10ahm39nrj4e1hi74jeq.apps.googleusercontent.com'
        })
      })
      .catch((err) => {
        ToastAndroid.show(`Play services error: ${err.code} ${err.message}`, ToastAndroid.SHORT)
      })
  }

  signInWithGoogle(){
    GoogleSignin.signIn()
      .then((user) => {
       this.props.loginRequest(user.idToken)
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
        {
          this.props.login.fetching ? (
             <Loading />
            ) : (
              <GoogleLoginButton onLoginPress={() => this.signInWithGoogle()}/>
            )
        }
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (accessToken) => dispatch(LoginActions.loginRequest(accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
