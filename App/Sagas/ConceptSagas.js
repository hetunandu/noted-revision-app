import { call, put } from 'redux-saga/effects'
import ConceptActions from '../Redux/ConceptRedux'
import LoginActions from '../Redux/LoginRedux'
import ResultActions from '../Redux/ResultRedux'
import { AsyncStorage } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'


export function * getConcepts (api, action) {
  const { subject, mode } = action
  try {
    const token = yield call(AsyncStorage.getItem, 'login_token')

    yield put(ResultActions.clearResult())

    yield call(NavigationActions.concepts)

    const response = yield call(api.getConcepts, token, subject, mode)

    // success?
    if (response.ok && response.data.success) {
      yield put(ConceptActions.conceptSuccess(response.data.message.concepts))
      yield put(LoginActions.updateSession(response.data.message.session_data))


    } else {
      yield put(ConceptActions.conceptFailure(response.data.error))
    }

  } catch (err){
    console.warn(err)
  }

}

export function * getSingleConcept(api, action){
  const { key } = action

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    yield put(ResultActions.clearResult())

    yield call(NavigationActions.concepts)

    const response = yield call(api.getSingleConcept, token, key)

    // success?
    if (response.ok && response.data.success) {

      yield put(ConceptActions.conceptSuccess([response.data.message.concept]))

      yield put(LoginActions.updateSession(response.data.message.session_data))


    } else {
      yield put(ConceptActions.conceptFailure(response.data.error))
    }

  }catch (err){
    console.warn(err)
    yield put(ConceptActions.conceptFailure(err))
  }
}
