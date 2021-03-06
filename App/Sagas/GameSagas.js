import { put } from 'redux-saga/effects'
import GameActions from '../Redux/GameRedux'

// can't do console.log in Sagas
export function * add ({}) {
  yield put(GameActions.playerAdd())
}

export function * reset ({}) {
  yield put(GameActions.gameReset())
}

export function * resetscores ({}) {
  yield put(GameActions.gameResetScores())
}

export function * scoring ({id, action, option}) {
  yield put(GameActions.scoring(id, action, option))
}

export function * updateName ({id, name}) {
  yield put(GameActions.updateName(id, name))
}

export function * betMinus ({}) {
  yield put(GameActions.betMinus())
}

export function * betPlus ({}) {
  yield put(GameActions.betPlus())
}

export function * toggleActive ({}) {
  yield put(GameActions.toggleActive())
}
