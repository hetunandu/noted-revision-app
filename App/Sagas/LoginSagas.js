import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'


// attempts to login
export function * login (api, action) {
  const { accessToken } = action
  const response = yield call(api.loginUser, accessToken)
  const data = response.data

  if(data.success){

    yield put(LoginActions.loginSuccess(data.message.user))

    yield call(NavigationActions.welcome)

  }else{

    yield put(LoginActions.loginFailure(data.error))

  }
}
