import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setNightMode: ['value'],
})

export const SettingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  nightMode: false,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const setNightMode = (state, { value }) => state.merge({ nightMode: value })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NIGHT_MODE]: setNightMode,
})
