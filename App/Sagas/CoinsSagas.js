import { call, put } from 'redux-saga/effects'
import CoinsActions from '../Redux/CoinsRedux'
import { AsyncStorage } from 'react-native'

export function * redeemCode (api, action) {
  const { code } = action

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    // make the call to the api
    const response = yield call(api.redeemCode, token, code)

    // success?
    if (response.ok && response.data.success) {

      yield put(CoinsActions.redeemSuccess(response.data.message))

    } else {
      yield put(CoinsActions.redeemFailure(response.data.error))
    }
  } catch (err){
    console.warn(err)
    yield put(CoinsActions.redeemFailure(err))

  }


}
