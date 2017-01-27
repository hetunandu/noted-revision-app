import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateSession: ['session'],
  skipRequest: null,
  skipSuccess: ['session'],
  skipFailure: ['error']
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  views: 0,
  reset_cost: 0,
  session_seconds: 0,
  created_at: null,
  updated_at: null,
  error: null
})

/* ------------- Reducers ------------- */

// update the session
export const updateSession = (state, { session }) => state.merge({...session})

export const request = (state) => state.merge({fetching: true})

export const success = (state, {session}) => state.merge({ fetching: false, ...session })

export const failure = (state, {error}) => state.merge({ fetching: false, error })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_SESSION]: updateSession,
  [Types.SKIP_REQUEST]: request,
  [Types.SKIP_SUCCESS]: success,
  [Types.SKIP_FAILURE]: failure
})
