/* ***********************************************************
* Wiring Instructions
* To make this test work, you'll need to:
*  - Add a Fixture named getIndex to the
*    ./App/Services/FixtureApi file. You can just keep adding
*    functions to that file.
*************************************************************/

import test from 'ava'
import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { getIndex } from '../../App/Sagas/IndexSagas'
import IndexActions from '../../App/Redux/IndexRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', t => {
  const step = stepper(getIndex(FixtureAPI, {data: 'taco'}))
  // first yield is the API
  t.deepEqual(step(), call(FixtureAPI.getIndex, 'taco'))
})

test('success path', t => {
  const response = FixtureAPI.getIndex('taco')
  const step = stepper(getIndex(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step successful return and data!
  t.deepEqual(step(response), put(IndexActions.indexSuccess(21)))
})

test('failure path', t => {
  const response = {ok: false}
  const step = stepper(getIndex(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step failed response
  t.deepEqual(step(response), put(IndexActions.indexFailure()))
})
