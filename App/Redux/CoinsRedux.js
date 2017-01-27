import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateBalance: ['balance'],
  redeemRequest: ['code'],
  redeemSuccess: ['data'],
  redeemFailure: ['error']
})

export const CoinsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  balance: 0,
  new_points: 0,
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

export const updateBalance = (state, {balance}) => state.merge({balance})

export const request = (state) => state.merge({ fetching: true})

export const success = (state, {data: {new_points, balance}}) => state.merge({ fetching: false, new_points, balance })

export const failure = (state, {error}) => state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_BALANCE]: updateBalance,
  [Types.REDEEM_REQUEST]: request,
  [Types.REDEEM_SUCCESS]: success,
  [Types.REDEEM_FAILURE]: failure
})
