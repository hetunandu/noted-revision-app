import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/CoinsRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.coinsRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.coinsSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.coinsFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
