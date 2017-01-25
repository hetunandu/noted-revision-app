import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  clearResult: null,
  markConcept: ['subject_key', 'concept_key', 'status'],
  resultRequest: null,
  resultSuccess: ['points'],
  resultFailure: ['error']
})

export const ResultTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: null,
  error: null,
  points: 0
})

/* ------------- Reducers ------------- */


export const clearResult = state => state.merge({data: [], points: 0})

export const markConcept = (state , {concept_key, status}) => state.merge({
  data: state.data.concat({
    key: concept_key,
    marked: status
  })
})

export const request = state => state.merge({fetching: true, error: null})

export const success = (state, {points}) => state.merge({fetching: false, points})

export const failure = (state, {error}) => state.merge({fetching: false, error})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLEAR_RESULT]: clearResult,
  [Types.MARK_CONCEPT]: markConcept,
  [Types.RESULT_REQUEST]: request,
  [Types.RESULT_SUCCESS]: success,
  [Types.RESULT_FAILURE]: failure
})
