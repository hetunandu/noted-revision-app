import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/IndexRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.indexRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.indexSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.indexFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
