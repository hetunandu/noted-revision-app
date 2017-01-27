import { call, put } from 'redux-saga/effects'
import PaymentActions from '../Redux/PaymentRedux'
import CoinsActions from '../Redux/CoinsRedux'
import { AsyncStorage } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'


export function * requestPayment (api) {

  try{

    const token = yield call(AsyncStorage.getItem, 'login_token')

    // make the call to the api
    const response = yield call(api.requestPayment, token)

    // success?
    if (response.ok && response.data.success) {

      yield put(PaymentActions.paymentSuccess(
        response.data.message.payment_request,
        response.data.message.payment_key
      ))

    } else {

      yield put(PaymentActions.paymentFailure(response.data.error))

    }

  } catch (err){
    console.warn(err)
    yield put(PaymentActions.paymentFailure(err))

  }

}

export function * paymentStatus(api, action){
  const {key} = action

  try{
    const token = yield call(AsyncStorage.getItem, 'login_token')
    // make the call to the api
    const response = yield call(api.paymentStatus, token, key)
    // success?
    if (response.ok && response.data.success) {

      yield put(PaymentActions.statusSuccess(response.data.message.status))

      if (response.data.message.status === 'Credit'){
        yield put(CoinsActions.updateBalance(response.data.message.balance))
        NavigationActions.pop()
      }

    } else {

      yield put(PaymentActions.statusFailure(response.data.error))

    }

  } catch (err){
    console.warn(err)
    yield put(PaymentActions.statusFailure(err))

  }


}
