
import { call, put, select } from 'redux-saga/effects'
import ResultActions from '../Redux/ResultRedux'
import { AsyncStorage } from 'react-native'


export function * submitResult(api){

  const {concepts, result} = yield select()

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    const response = yield call(api.submitResult, token, concepts.subject, concepts.mode, result.data)

    // success?
    if (response.ok && response.data.success) {
      yield put(ResultActions.resultSuccess(response.data.message.new_points))

      // update points over here
      // yield put(LoginActions.updateSession(response.data.message.session_data))

    } else {
      yield put(ResultActions.resultFailure(response.data.error))
    }

  }catch (err){
    console.warn(err)
  }

}
