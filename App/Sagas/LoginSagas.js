import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import {GoogleSignin} from 'react-native-google-signin';
import {AsyncStorage} from 'react-native';

// Check token, with token get user details, if error, configure google login
export function * loginInit(api){

  try{
    
    // Check if the token exists in storage
    const token = yield call(AsyncStorage.getItem, 'login_token')

    if (token){
      // call server to check validiity of token
      const response = yield call(api.checkToken, token)
      // Was the server response a success
      if (response.data.success){
        // run the success action
        yield put(LoginActions.loginSuccess(response.data.message.user))
        
        // navigate to the welcome screen
        yield call(NavigationActions.welcome)
      }else{
        // Server sent some error, need the user to login again
        yield put(LoginActions.loginFailure(response.data.error))
      }

    }else{

      // set auth to false 
      yield put(LoginActions.loginFailure())
      //configure google login
      const hasPlayServices = yield call(GoogleSignin.hasPlayServices, {autoResolve: true})
      if (hasPlayServices){
        GoogleSignin.configure({
          webClientId: '865864307125-gob0frva3ifb10ahm39nrj4e1hi74jeq.apps.googleusercontent.com'
        })
      }else{
        yield put(LoginActions.loginFailure('Need google play services to login'))
      }
    }
  }catch (err) {
    yield put(LoginActions.loginFailure(err))
  }
}

// attempts to login
export function * login (api, action) {
  // get the access token from action
  const { accessToken } = action
  // call the api with the token
  const response = yield call(api.loginUser, accessToken)
  const data = response.data
  // was the server able to login the user
  if(data.success){
    // Save the token for next time use
    yield call(AsyncStorage.setItem, 'login_token', data.message.token)
    // run the success action
    yield put(LoginActions.loginSuccess(data.message.user))
    // navigate the welcome screen
    yield call(NavigationActions.welcome)

  }else{
    // Error in login
    yield put(LoginActions.loginFailure(data.error))

  }
}
