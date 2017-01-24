import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/ConceptRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.conceptRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.conceptSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.conceptFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
