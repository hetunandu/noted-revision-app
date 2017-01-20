import { takeLatest, call, put } from 'redux-saga'
import API from '../Services/Api'
import { AsyncStorage } from 'react-native';

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { SubjectTypes } from '../Redux/SubjectRedux';
/* ------------- Sagas ------------- */

import { login, loginInit } from './LoginSagas'
import { getSubjects } from './SubjectSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(LoginTypes.LOGIN_INIT, loginInit, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(SubjectTypes.SUBJECT_REQUEST, getSubjects, api)
  ]
}
