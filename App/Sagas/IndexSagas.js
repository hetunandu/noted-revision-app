import { call, put, select } from 'redux-saga/effects'
import IndexActions from '../Redux/IndexRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'

export function * getIndex (api, action) {
  const { subject_key } = action

  try{

    yield call(NavigationActions.index, {subject_key})

    const token = yield call(AsyncStorage.getItem, 'login_token')

    // make the call to the api
    const response = yield call(api.getIndex, token, subject_key)

    // success?
    if (response.ok) {
      yield put(IndexActions.indexSuccess(subject_key, response.data.message.index))

    } else {
      yield put(IndexActions.indexFailure(response.data.error))
    }

  } catch(err){
      yield put(console.error(err))
  }

}
