import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/SessionRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.sessionRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.sessionSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.sessionFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
