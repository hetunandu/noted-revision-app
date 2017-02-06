import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  subjectRequest: null,
  subjectSuccess: ['subjects'],
  subjectFailure: ['error'],
  markConcept: ['subject_key','concept_key', 'status']
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
export const success = (state, { subjects }) => state.merge({ fetching: false, error: null, list: subjects })

// Something went wrong somewhere.
export const failure = (state, {error}) => state.merge({ fetching: false, error })

export const markConcept = (state, {concept_key, status}) => {
  return state.merge({
    list: state.list.map(subject => {
      return subject.merge({
        index: subject.index.map(chapter => {
          return chapter.merge({
            concepts: chapter.concepts.map(concept => {
              if (concept.key == concept_key) {

                if(status == 'read'){
                  return concept.merge({read: concept.read ? concept.read + 1 : 1})
                }else if(status == 'star'){
                  return concept.merge({important: !concept.important})
                }else{
                  return concept
                }
              } else {
                return concept
              }
            })
          })
        })
      })
    })
  })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBJECT_REQUEST]: request,
  [Types.SUBJECT_SUCCESS]: success,
  [Types.SUBJECT_FAILURE]: failure,
  [Types.MARK_CONCEPT]: markConcept

})
