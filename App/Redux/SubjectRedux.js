import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  subjectRequest: null,
  subjectSuccess: ['subjects'],
  subjectFailure: ['error'],
  markConcept: ['subject_key', 'status']
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
export const success = (state, { subjects }) => state.merge({ index: 0, fetching: false, error: null, list: subjects })

// Something went wrong somewhere.
export const failure = (state, {error}) => state.merge({ fetching: false, error })

export const addReadCounter = (state, {subject_key, status}) =>
  state.merge({list: state.list.map(subject => {
    if(subject.key == subject_key){
      if(status == 'read') {
        return subject.merge({read_concepts: subject.read_concepts + 1})
      }else {
        return subject
      }
    }else{
      return subject
    }
  })})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBJECT_REQUEST]: request,
  [Types.SUBJECT_SUCCESS]: success,
  [Types.SUBJECT_FAILURE]: failure,
  [Types.MARK_CONCEPT]: addReadCounter

})
