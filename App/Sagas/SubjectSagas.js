import { call, put } from 'redux-saga/effects'
import SubjectActions from '../Redux/SubjectRedux'
import { AsyncStorage } from 'react-native'

export function * getSubjects (api) {

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    // make the call to the api
    const response = yield call(api.getSubjects, token)

    // success?
    if (response.ok && response.data.success) {
      yield put(SubjectActions.subjectSuccess(response.data.message.subjects))
    } else {
      yield put(SubjectActions.subjectFailure(response.data.error))
    }
  }catch (err){
    yield put(SubjectActions.subjectFailure(err))
  }

}
