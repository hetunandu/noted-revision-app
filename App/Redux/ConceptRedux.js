import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  conceptRequest: ['subject', 'mode'],
  conceptSuccess: ['concepts'],
  conceptFailure: null,
  toggleReference: ['error'],
  markConcept: ['concept_key'],
  singleRequest: ['subject', 'key'],
  starRequest: ['subject_key', 'concept_key'],
  starSuccess: ['subject_key', 'concept_key'],
  starFailure: ['error']
})

export const ConceptTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  subject: null,
  list: [],
  mode: null,
  showRef: false,
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { subject, mode }) => state.merge({
    fetching: true,
    list: [],
    mode: mode ? mode : 'revise',
    subject,
    showRef: false,
    error: null
  })

// successful api lookup
export const success = (state, {concepts}) => state.merge({ fetching: false, error: null, list: concepts })

// Something went wrong somewhere.
export const failure = (state, {error}) => state.merge({ fetching: false, error })

export const toggleRef = state => state.merge({ showRef: !state.showRef })

export const markConcept = (state, {concept_key}) => state.merge({
  list: state.list.filter(concept => concept.key !== concept_key)
})

//export const

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MARK_CONCEPT]: markConcept,
  [Types.CONCEPT_REQUEST]: request,
  [Types.SINGLE_REQUEST]: request,
  [Types.CONCEPT_SUCCESS]: success,
  [Types.CONCEPT_FAILURE]: failure,
  [Types.TOGGLE_REFERENCE]: toggleRef,
})
