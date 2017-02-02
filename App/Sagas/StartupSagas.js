import { put, call, select } from 'redux-saga/effects'
import { is } from 'ramda'
import LoginActions from '../Redux/LoginRedux'


// process STARTUP actions
export function * startup (action) {
  try{

    yield put(LoginActions.loginInit())

  } catch (err){
    console.tron.error(err)
  }

}
