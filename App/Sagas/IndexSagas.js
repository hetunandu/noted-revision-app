import { call, put, select } from 'redux-saga/effects'
import IndexActions from '../Redux/IndexRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'

export function * getIndex (api, action) {
  const { subject } = action

  try{

    //yield call(NavigationActions.index, {subject_key: subject.key, title: subject.name})

    const token = yield call(AsyncStorage.getItem, 'login_token')

    // make the call to the api
    const response = yield call(api.getIndex, token, subject.key)

    // success?
    if (response.ok) {
      yield put(IndexActions.indexSuccess(subject.key, response.data.message.index))

    } else {
      yield put(IndexActions.indexFailure(response.data.error))
    }

  } catch(err){
      yield put(console.error(err))
  }

}


export function * starConcept(api, action){
  const { subject_key, concept_key } = action

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    const response = yield call(api.starConcept, token, concept_key)

    if (response.ok && response.data.success){
      yield put(IndexActions.starSuccess(subject_key, concept_key))
    }else{
      yield put(IndexActions.starFailure(response.data.error))
    }

  }catch (err){
    console.warn(err)
    yield put(IndexActions.starFailure(err))
  }

}

export function * downloadIndex(api, action) {
  const {key} = action

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')

    const response = yield call(api.downloadIndex, token, key)

    if (response.ok && response.data.success){
      yield put(IndexActions.downloadSuccess(key, response.data.message))
    }else{
      yield put(IndexActions.downloadFailure(response.data.error))
    }

  }catch (err){
    console.tron.error(err)
  }

}
