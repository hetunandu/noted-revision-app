import { call, put, select } from 'redux-saga/effects'
import ConceptActions from '../Redux/ConceptRedux'
import SessionActions from '../Redux/SessionRedux'
import ResultActions from '../Redux/ResultRedux'
import { AsyncStorage, ToastAndroid } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'


const getConceptData = state => state.concepts.data;
const getViews = state => state.session.views;
const getSubjects = state => state.subjects.list

export function * getConcepts (api, action) {
  const { subject, mode } = action


  try{
    const views = yield select(getViews)
    const subjects = yield select(getSubjects)

    const unRead = yield call(getUnreadConcepts, subject, subjects)

    if (unRead.length == 0){
      yield put(ConceptActions.conceptFailure('No unread concepts left'))
      yield call(ToastAndroid.show, "No unread concepts left to revise", ToastAndroid.LONG)
    }else{
      // Set Maximum 5 concepts only
      unRead.length = 5

      // If views are limited then limit concepts to views
      if (unRead.length > views){
        unRead.length = views
      }


      const token = yield call(AsyncStorage.getItem, 'login_token')

      yield put(ResultActions.clearResult())

      yield call(NavigationActions.concepts)

      const response = yield call(api.getBatchConcepts, token, unRead)

      // success?
      if (response.ok && response.data.success) {
        yield put(ConceptActions.conceptSuccess(response.data.message.concepts))

        yield put(ConceptActions.saveConcepts(response.data.message.concepts))

      } else {
        yield put(ConceptActions.conceptFailure(response.data.error))
      }
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

        yield put(ConceptActions.conceptSuccess([response.data.message.concept]))

        yield put(ConceptActions.saveConcept(response.data.message.concept))

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



function getUnreadConcepts(subject, subjects) {

  let concepts = []

  subjects.map(s => {
    if(s.key == subject){
      s.index.map(ch => {
        ch.concepts.map(con => {
          if(!con.read){
            concepts.push(con.key)
          }
        })
      })
    }
  })

  return concepts

}
