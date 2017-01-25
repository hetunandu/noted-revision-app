import { takeLatest, call, put } from 'redux-saga'
import API from '../Services/Api'
import { AsyncStorage } from 'react-native';

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { SubjectTypes } from '../Redux/SubjectRedux'
import { ConceptTypes } from '../Redux/ConceptRedux'
import { ResultTypes } from '../Redux/ResultRedux'
import { IndexTypes } from '../Redux/IndexRedux'

/* ------------- Sagas ------------- */

import { login, loginInit } from './LoginSagas'
import { getSubjects } from './SubjectSagas'
import { getConcepts, getSingleConcept } from './ConceptSagas'
import { submitResult } from './ResultSagas'
import { getIndex } from './IndexSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(LoginTypes.LOGIN_INIT, loginInit, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(SubjectTypes.SUBJECT_REQUEST, getSubjects, api),
    takeLatest(ConceptTypes.CONCEPT_REQUEST, getConcepts, api),
    takeLatest(ConceptTypes.SINGLE_REQUEST, getSingleConcept, api),
    takeLatest(ResultTypes.RESULT_REQUEST, submitResult, api),
    takeLatest(IndexTypes.INDEX_REQUEST, getIndex, api)
  ]
}
