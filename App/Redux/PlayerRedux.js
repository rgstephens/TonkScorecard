// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  won: ['amount']
})

export const PlayerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  name: '',
  balance: 0,
  active: true
})

/* ------------- Reducers ------------- */
const update = (state, mutations) =>
  Object.assign({}, state, mutations);

// won
export const won = (state = INITIAL_STATE, { amount }: Object) => {
  console.log('amount: ' + JSON.stringify(amount));
  state = update(state, { balance: state.balance + amount })
  return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WON]: won
})
