import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { GameTypes } from '../Redux/GameRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { getTemperature } from './TemperatureSagas'
import { reset, add, resetscores, updateName, betPlus, betMinus, toggleActive, scoring } from './GameSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(GameTypes.PLAYER_ADD_REQUEST, add),
    takeLatest(GameTypes.GAME_RESET_REQUEST, reset),
    takeLatest(GameTypes.GAME_RESET_SCORES_REQUEST, resetscores),
    takeLatest(GameTypes.BET_PLUS_REQUEST, betPlus),
    takeLatest(GameTypes.BET_MINUS_REQUEST, betMinus),
    takeLatest(GameTypes.TOGGLE_ACTIVE_REQUEST, toggleActive),
    takeLatest(GameTypes.SCORING_REQUEST, scoring),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GameTypes.UPDATE_NAME_REQUEST, updateName),
    takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api)
  ]
}
