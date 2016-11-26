import { put } from 'redux-saga/effects'
import PlayerActions from '../Redux/PlayerRedux'

// can't do console.log in Sagas
export function * won ({id, multiplier}) {
  yield put(PlayerActions.won(id, multiplier))
}
