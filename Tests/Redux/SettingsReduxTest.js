import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/SettingsRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.settingsRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.settingsSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.settingsFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
