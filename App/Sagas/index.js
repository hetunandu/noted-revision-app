import { takeLatest, call, put } from 'redux-saga'
import API from '../Services/Api'
import { AsyncStorage } from 'react-native';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SubjectTypes } from '../Redux/SubjectRedux'
import { ConceptTypes } from '../Redux/ConceptRedux'
import { ResultTypes } from '../Redux/ResultRedux'
import { IndexTypes } from '../Redux/IndexRedux'
import { SessionTypes } from '../Redux/SessionRedux'
import { CoinsTypes } from '../Redux/CoinsRedux'
import { PaymentTypes } from '../Redux/PaymentRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, loginInit, subscribeCourse,  } from './LoginSagas'
import { getSubjects } from './SubjectSagas'
import { getConcepts, getSingleConcept } from './ConceptSagas'
import { submitResult} from './ResultSagas'
import { getIndex, starConcept, downloadIndex } from './IndexSagas'
import { skipCooldown, activatePro } from './SessionSagas'
import { redeemCode } from './CoinsSagas'
import { requestPayment, paymentStatus } from './PaymentSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_INIT, loginInit, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.SUBSCRIBE_REQUEST, subscribeCourse, api),
    takeLatest(SubjectTypes.SUBJECT_REQUEST, getSubjects, api),
    takeLatest(ConceptTypes.CONCEPT_REQUEST, getConcepts, api),
    takeLatest(ConceptTypes.SINGLE_REQUEST, getSingleConcept, api),
    takeLatest(ResultTypes.RESULT_REQUEST, submitResult, api),
    takeLatest(IndexTypes.INDEX_REQUEST, getIndex, api),
    takeLatest(SessionTypes.SKIP_REQUEST, skipCooldown, api),
    takeLatest(CoinsTypes.REDEEM_REQUEST, redeemCode, api),
    takeLatest(PaymentTypes.PAYMENT_REQUEST, requestPayment, api),
    takeLatest(PaymentTypes.STATUS_REQUEST, paymentStatus, api),
    takeLatest(IndexTypes.STAR_CONCEPT, starConcept, api),
    takeLatest(SessionTypes.PRO_REQUEST, activatePro, api),
    takeLatest(IndexTypes.DOWNLOAD_REQUEST, downloadIndex, api)
  ]
}
