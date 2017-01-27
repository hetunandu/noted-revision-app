import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/PaymentRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.paymentRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.paymentSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.paymentFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
