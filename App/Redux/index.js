// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    subjects: require('./SubjectRedux').reducer,
    concepts: require('./ConceptRedux').reducer,
    result: require('./ResultRedux').reducer,
    index: require('./IndexRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
