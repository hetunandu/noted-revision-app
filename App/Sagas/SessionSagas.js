import { call, put } from 'redux-saga/effects'
import SessionActions from '../Redux/SessionRedux'
import { AsyncStorage } from 'react-native'

export function * skipCooldown (api) {

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    // make the call to the api
    const response = yield call(api.skipCooldown, token)

    // success?
    if (response.ok && response.data.success) {

      yield put(SessionActions.skipSuccess(response.data.message.session))

    } else {

      yield put(SessionActions.skipFailure(response.data.error))

    }
  }catch (err){

    console.warn(err)

    yield put(SessionActions.skipFailure(err))


  }



}
