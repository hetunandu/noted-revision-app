import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import SessionActions from '../Redux/SessionRedux'
import CoinsActions from '../Redux/CoinsRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import {GoogleSignin} from 'react-native-google-signin';
import {AsyncStorage, ToastAndroid, NetInfo} from 'react-native';


// Check token, with token get user details, if error, configure google login
export function * loginInit(api){

  try{
    yield call(googleLoginConfigure)

    // Check if internet is there
    const isConnected = yield call(NetInfo.isConnected.fetch)

    if(!isConnected){

      yield put(LoginActions.loginFailure("No internet"))

      yield call(NavigationActions.game)

    }else{

      // Check if the token exists in storage
      const token = yield call(AsyncStorage.getItem, 'login_token')

      if (token){
        // call server to check validity of token
        const response = yield call(api.checkToken, token)
        // Was the server response a success
        if (response.ok && response.data.success){
          // run the success action
          yield put(LoginActions.loginSuccess(response.data.message.user))

          yield put(SessionActions.updateSession(response.data.message.user.session))

          yield put(CoinsActions.updateBalance(response.data.message.user.points))

          if(!response.data.message.user.course){

            yield call(NavigationActions.subscribe)

          }else{
            // navigate the welcome screen
            yield call(NavigationActions.subjects)
          }

        }else{
          // Server sent some error, need the user to login again
          yield put(LoginActions.loginFailure(response.data.error))
        }

      }else{
        // set auth to false
        yield put(LoginActions.loginFailure())

      }
    }

  }catch (err) {
    console.warn(err)
    yield put(LoginActions.loginFailure(err))
  }
}

function googleLoginConfigure(){
  GoogleSignin.hasPlayServices({ autoResolve: true })
    .then(() => {
      GoogleSignin.configure({
        webClientId: '865864307125-gob0frva3ifb10ahm39nrj4e1hi74jeq.apps.googleusercontent.com'
      })
    })
    .catch((err) => {
      ToastAndroid.show(`Play services error: ${err.code} ${err.message}`, ToastAndroid.SHORT)
    })
}

// attempts to login
export function * login (api, action) {

  try {
    // get the access token from action
    const { accessToken } = action
    // call the api with the token
    const response = yield call(api.loginUser, accessToken)
    const data = response.data
    // was the server able to login the user
    if(response.ok && data.success){
      // Save the token for next time use
      yield call(AsyncStorage.setItem, 'login_token', data.message.token)
      // run the success action
      yield put(LoginActions.loginSuccess(data.message.user))

      yield put(SessionActions.updateSession(data.message.user.session))

      yield put(CoinsActions.updateBalance(data.message.user.points))

      if(!response.data.course){

        yield call(NavigationActions.subscribe)
      }else{
        // navigate the welcome screen
        yield call(NavigationActions.subjects)
      }



    }else{
      // Error in login
      yield put(LoginActions.loginFailure(data.error))

    }
  } catch (err){
    yield put(LoginActions.loginFailure())
    console.warn(err)
  }

}


export function * subscribeCourse(api, action) {

  const {college} = action

  const course = 'agtzfm5vdGVkLWFwaXITCxIGQ291cnNlGICAgIDAtZsKDA'

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    const response = yield call(api.subscribeCourse, token, course, college)

    if(response.ok && response.data.success){

      yield put(LoginActions.subscribeSuccess())

      yield call(NavigationActions.subjects)

    }else{
      yield put(LoginActions.subscribeFailure(response.data.error))
    }

  }catch (err){
    console.warn(err)

    yield put(LoginActions.subscribeFailure(err))

  }

}
