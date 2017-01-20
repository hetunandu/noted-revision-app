import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/SubjectRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.subjectRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.subjectSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.subjectFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
