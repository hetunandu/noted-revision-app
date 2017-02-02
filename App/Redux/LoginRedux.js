// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginInit: null,
  loginRequest: ['accessToken'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logout: null,
  updateCoins: ['coins'],
  subscribeRequest: ['college'],
  subscribeSuccess: null,
  subscribeFailure: ['error'],
  proRequest: null,
  proSuccess: null,
  proFailure: ['error']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isAuthenticated: false,
  user: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// init login
export const init = (state) => state.merge( {fetching: true} )

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { user }: Object) =>
  state.merge({ fetching: false, error: null, user, isAuthenticated: true })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error, isAuthenticated: false })

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

export const updateCoins = (state, {coins}) => state.merge({ user: {points: state.user.points + coins}}, {deep: true})

export const subscribeRequest = (state) => state.merge({fetching: true})

export const subscribeSuccess = (state) => state.merge({fetching: false})

export const subscribeFailure = (state, {error}) => state.merge({ fetching: false, error })

export const proRequest = (state) => state.merge({fetching: true})

export const proSuccess = state => state.merge({ fetching: false, user: {pro: true} }, {deep: true})

export const proFailure = (state, {error}) => state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_INIT]: init,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.UPDATE_COINS]: updateCoins,
  [Types.SUBSCRIBE_REQUEST]: subscribeRequest,
  [Types.SUBSCRIBE_SUCCESS]: subscribeSuccess,
  [Types.SUBSCRIBE_FAILURE]: subscribeFailure,
  [Types.PRO_REQUEST]: proRequest,
  [Types.PRO_SUCCESS]: proSuccess,
  [Types.PRO_FAILURE]: proFailure
})
