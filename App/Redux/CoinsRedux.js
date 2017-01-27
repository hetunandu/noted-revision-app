import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateBalance: ['balance'],
  coinsRequest: ['data'],
  coinsSuccess: ['payload'],
  coinsFailure: null
})

export const CoinsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  balance: 0,
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

export const updateBalance = (state, {balance}) => state.merge({balance})

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_BALANCE]: updateBalance,
  [Types.COINS_REQUEST]: request,
  [Types.COINS_SUCCESS]: success,
  [Types.COINS_FAILURE]: failure
})
