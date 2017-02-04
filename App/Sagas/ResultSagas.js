
import { call, put, select } from 'redux-saga/effects'
import ResultActions from '../Redux/ResultRedux'
import CoinsActions from '../Redux/CoinsRedux'
import SessionActions from '../Redux/SessionRedux'
import { AsyncStorage } from 'react-native'


export function * submitResult(api){

  const {result} = yield select()

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    const response = yield call(api.submitResult, token, result.data)

    // success?
    if (response.ok && response.data.success) {

      yield put(ResultActions.resultSuccess(response.data.message.new_points))

      yield put(CoinsActions.updateBalance(response.data.message.balance))

      yield put(SessionActions.updateSession(response.data.message.session))

    } else {

      yield put(ResultActions.resultFailure(response.data.error))

    }

  }catch (err){
    console.warn(err)
  }

}
