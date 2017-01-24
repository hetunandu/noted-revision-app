import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'

// exported to make available for tests
export const selectTemperature = (state) => state.temperature.temperature

// process STARTUP actions
export function * startup (action) {

}
