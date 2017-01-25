
import { call, put, select } from 'redux-saga/effects'
import ResultActions from '../Redux/ResultRedux'
import LoginActions from '../Redux/LoginRedux'
import { AsyncStorage } from 'react-native'


export function * submitResult(api){

  const {concepts, result} = yield select()

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    const response = yield call(api.submitResult, token, concepts.subject, concepts.mode, result.data)

    // success?
    if (response.ok && response.data.success) {
      yield put(ResultActions.resultSuccess(response.data.message.new_points))

      yield put(LoginActions.updateCoins(response.data.message.new_points))



    } else {
      yield put(ResultActions.resultFailure(response.data.error))
    }

  }catch (err){
    console.warn(err)
  }

}
