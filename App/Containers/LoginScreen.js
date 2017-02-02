// @flow
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
import LoginHeader from '../Components/LoginHeader';
import GoogleLoginButton from '../Components/GoogleLoginButton';
import Loading from '../Components/Loading';
import LoginActions from '../Redux/LoginRedux'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import styles from './Styles/LoginScreenStyle'
import { tracker } from '../Lib/googleAnalytics';

class LoginScreen extends React.Component {

  componentDidMount(){
    tracker.trackScreenView('Login');
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
        {this.props.login.error && <Text style={{color: 'red'}}>{this.props.login.error}</Text>}
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
    loginRequest: (accessToken) => dispatch(LoginActions.loginRequest(accessToken)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
