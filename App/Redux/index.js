// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    session: require('./SessionRedux').reducer,
    coins: require('./CoinsRedux').reducer,
    subjects: require('./SubjectRedux').reducer,
    concepts: require('./ConceptRedux').reducer,
    result: require('./ResultRedux').reducer,
    index: require('./IndexRedux').reducer,
    payment: require('./PaymentRedux').reducer,
    settings: require('./SettingsRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
