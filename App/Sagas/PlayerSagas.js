import { put } from 'redux-saga/effects'
import PlayerActions from '../Redux/PlayerRedux'

// can't do console.log in Sagas
export function * won ({name}) {
  yield put(PlayerActions.won(name))
}
