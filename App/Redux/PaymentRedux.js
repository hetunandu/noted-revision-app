import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  paymentRequest: null,
  paymentSuccess: ['request', 'key'],
  paymentFailure: ['error'],
  statusRequest: ['key'],
  statusSuccess: ['status'],
  statusFailure: ['error']

})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  request: {},
  key: '',
  status: ''
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({ fetching: true, request: {}, key: '', status: ''})

// successful api lookup
export const success = (state, {request, key}) => state.merge({ fetching: false, request, key })

// Something went wrong somewhere.
export const failure = (state, {error} )=> state.merge({ fetching: false, error })

export const statusSuccess = (state, {status}) => state.merge({ status })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_REQUEST]: request,
  [Types.PAYMENT_SUCCESS]: success,
  [Types.PAYMENT_FAILURE]: failure,
  [Types.STATUS_SUCCESS]: statusSuccess
})
