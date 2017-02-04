import { call, put } from 'redux-saga/effects'
import SessionActions from '../Redux/SessionRedux'
import CoinsActions from '../Redux/CoinsRedux'
import { AsyncStorage } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info'

export function * skipCooldown (api) {

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    // make the call to the api
    const response = yield call(api.skipCooldown, token)

    // success?
    if (response.ok && response.data.success) {

      yield put(SessionActions.skipSuccess(response.data.message.session))

      yield put(CoinsActions.updateBalance(response.data.message.balance))

    } else {

      yield put(SessionActions.skipFailure(response.data.error))

    }
  }catch (err){

    console.warn(err)

    yield put(SessionActions.skipFailure(err))


  }


}

export function * activatePro(api, action){

  try{

    const token = yield call(AsyncStorage.getItem, 'login_token')

    const deviceId =  yield call(DeviceInfo.getUniqueID)

    const response = yield call(api.activatePro, token, deviceId)

    if(response.ok && response.data.success){
      yield put(SessionActions.proSuccess())

      yield call(NavigationActions.subjects)

    }else{

      yield put(SessionActions.proFailure(response.data.error))

    }

  }catch (err){
    console.tron.err(err)
  }

}
