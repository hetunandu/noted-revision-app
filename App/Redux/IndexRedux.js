import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  indexRequest: ['subject'],
  indexSuccess: ['key', 'index'],
  indexFailure: ['error'],
  markConcept: ['subject_key','concept_key', 'status'],
  starConcept: ['subject_key', 'concept_key'],
  starSuccess: ['subject_key', 'concept_key'],
  starFailure: ['error'],
  downloadRequest: ['key'],
  downloadSuccess: ['key', 'index'],
  downloadFailure: ['error']
})

export const IndexTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({ fetching: true })

// successful api lookup
export const success = (state, {key, index}) =>
  state.merge({ fetching: false, error: null, data: state.data.setIn([`${key}`], index)})

// Something went wrong somewhere.
export const failure = (state, {error}) => state.merge({ fetching: false, error })

export const markConcept = (state, {subject_key, concept_key, status}) => {

  if(state.data[`${subject_key}`]){
    const index = state.data[`${subject_key}`].map(chapter => {
      return chapter.merge({
        concepts: chapter.concepts.map(concept => {
          if (concept.key == concept_key) {
            if (status == 'read') {
              return concept.set("read", concept.read ? concept.read + 1 : 1)
            }else{
              return concept
            }
          } else {
            return concept
          }
        })
      })
    })

    return state.merge({ data: state.data.setIn([subject_key], index)})

  }else{
    return state
  }
}

export const starSuccess = (state, {subject_key, concept_key}) => {
  if(state.data[`${subject_key}`]){
    const index = state.data[`${subject_key}`].map(chapter => {
      return chapter.merge({
        concepts: chapter.concepts.map(concept => {
          if (concept.key == concept_key) {
            return concept.set("important", true)
          } else {
            return concept
          }
        })
      })
    })

    return state.merge({ data: state.data.setIn([subject_key], index)})

  }else{
    return state
  }
}

export const downloadRequest = state => state.merge({fetching: true})

export const downloadSuccess = (state, {key, index}) =>
  state.merge({ fetching: false, error: null, data: state.data.setIn([`${key}`], index)})

export const downloadFailure = (state, {error}) => state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INDEX_REQUEST]: request,
  [Types.INDEX_SUCCESS]: success,
  [Types.INDEX_FAILURE]: failure,
  [Types.MARK_CONCEPT]: markConcept,
  [Types.STAR_SUCCESS]: starSuccess,
  [Types.DOWNLOAD_REQUEST]: downloadRequest,
  [Types.DOWNLOAD_SUCCESS]: downloadSuccess,
  [Types.DOWNLOAD_FAILURE]: downloadFailure
})
