import { call, put, select } from 'redux-saga/effects'
import ConceptActions from '../Redux/ConceptRedux'
import SessionActions from '../Redux/SessionRedux'
import ResultActions from '../Redux/ResultRedux'
import { AsyncStorage } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'


const getConceptData = state => state.concepts.data;

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
      yield put(SessionActions.updateSession(response.data.message.session_data))


    } else {
      yield put(ConceptActions.conceptFailure(response.data.error))
    }

  } catch (err){
    console.warn(err)
    yield put(ConceptActions.conceptFailure(err))
  }

}

export function * getSingleConcept(api, action){
  const { key } = action

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    yield put(ResultActions.clearResult())

    yield call(NavigationActions.concepts)

    const concepts = yield select(getConceptData)


    if(key in concepts){

      yield put(ConceptActions.conceptSuccess([concepts[key]]))

    }else{
      const response = yield call(api.getSingleConcept, token, key)

      // success?
      if (response.ok && response.data.success) {

        yield put(ConceptActions.saveConcept(response.data.message.concept))

        yield put(ConceptActions.conceptSuccess([response.data.message.concept]))

        yield put(SessionActions.updateSession(response.data.message.session_data))


      } else {
        yield put(ConceptActions.conceptFailure(response.data.error))
        // No views left. Take them to subject screen where cooldown timer is active
        if(response.status == 420){
          yield call(NavigationActions.subjects)
        }
      }
    }

  }catch (err){
    console.warn(err)
    yield put(ConceptActions.conceptFailure(err))
  }
}
