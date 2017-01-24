import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/ResultRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.resultRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.resultSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.resultFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
