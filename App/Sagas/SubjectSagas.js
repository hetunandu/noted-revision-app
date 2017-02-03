import { call, put, select } from 'redux-saga/effects'
import SubjectActions from '../Redux/SubjectRedux'
import { AsyncStorage } from 'react-native'



const getSubjectList = state => state.subjects.list;

export function * getSubjects (api) {

  try{

    // Check if subjects exist
    // TODO Refresh list every week
    const subjects = yield select(getSubjectList)

    if (subjects.length > 0 ){

      yield put(SubjectActions.subjectSuccess(subjects))

    }else{
      // No subjects, get it

      const token = yield call(AsyncStorage.getItem, 'login_token')

      // make the call to the api
      const response = yield call(api.getSubjects, token)

      // success?
      if (response.ok && response.data.success) {

        yield put(SubjectActions.subjectSuccess(response.data.message.subjects))

      } else {

        yield put(SubjectActions.subjectFailure(response.data.error))
      }
    }

  }catch (err){
    yield put(SubjectActions.subjectFailure(err))
  }

}
