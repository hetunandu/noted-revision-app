import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  subjectRequest: null,
  subjectSuccess: ['subjects'],
  subjectFailure: ['error']
})

export const SubjectTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({ fetching: true })

// successful api lookup
export const success = (state, { subjects }) => {
  return state.merge({ fetching: false, error: null, list: subjects })
}

// Something went wrong somewhere.
export const failure = (state, {error}) => state.merge({ fetching: false, error: error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBJECT_REQUEST]: request,
  [Types.SUBJECT_SUCCESS]: success,
  [Types.SUBJECT_FAILURE]: failure
})