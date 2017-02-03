import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  conceptRequest: ['subject', 'mode'],
  conceptSuccess: ['concepts'],
  conceptFailure: ['error'],
  markConcept: ['concept_key', 'status'],
  toggleReference: ['error'],
  singleRequest: ['key'],
  saveConcept: ['concept'],
  starRequest: ['subject_key', 'concept_key'],
  starSuccess: ['subject_key', 'concept_key'],
  starFailure: ['error'],
  toggleSpeakConcept: null,
})

export const ConceptTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  subject: null,
  data: {},
  list: [],
  mode: null,
  showRef: false,
  isSpeaking: false,
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
export const success = (state, {concepts}) => state.merge({
  fetching: false,
  error: null,
  isSpeaking: false,
  list: concepts
})

// Something went wrong somewhere.
export const failure = (state, {error}) => state.merge({ fetching: false, error })

export const saveConcept = (state, {concept}) => {
  return state.merge({ data: state.data.setIn([`${concept.key}`], concept)})

}

export const toggleRef = state => state.merge({ showRef: !state.showRef })

export const markConcept = (state, {concept_key, status}) => state.merge({
    list: state.list.filter(concept => concept.key !== concept_key),
  })

export const starConcept = (state, {concept_key}) => state.merge({
  list: state.list.map(concept => {
    if(concept.key == concept_key){
      return concept.merge({important: true})
    }else{
      return concept
    }
  })
})

export const speakConcept = (state) => state.merge({isSpeaking: !state.isSpeaking})

//export const

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_CONCEPT]: saveConcept,
  [Types.CONCEPT_REQUEST]: request,
  [Types.SINGLE_REQUEST]: request,
  [Types.CONCEPT_SUCCESS]: success,
  [Types.CONCEPT_FAILURE]: failure,
  [Types.MARK_CONCEPT]: markConcept,
  [Types.TOGGLE_REFERENCE]: toggleRef,
  [Types.STAR_SUCCESS]: starConcept,
  [Types.TOGGLE_SPEAK_CONCEPT]: speakConcept
})
