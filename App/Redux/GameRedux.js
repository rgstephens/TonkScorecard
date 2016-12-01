import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { INITIAL_STATE as PLAYER_INITIAL_STATE } from './PlayerRedux'
import { ActionConst, Actions as NavigationActions } from 'react-native-router-flux'

// Game is a reducer/collection that tracks the state of the Player reducers/collection

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gameResetRequest: [],
  gameReset: [],
  gameResetScoresRequest: [],
  gameResetScores: [],
  playerAddRequest: [],
  playerAdd: [],
  playerDelete: ['name'],
  toggleActiveRequest: ['id'],
  toggleActive: ['id'],
  betPlusRequest: [],
  betPlus: [],
  betMinusRequest: [],
  betMinus: [],
  scoringRequest: ['id', 'action', 'option'],
  scoring: ['id', 'action', 'option'],
  updateNameRequest: ['id', 'name'],
  updateName: ['id', 'name'],
  wonRequest: ['id', 'multiplier'],
  won: ['id', 'multiplier']
})

export const GameTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  playerCount: 3,
  activeCount: 3,
  bet: 1,
  undercutScoring: false,
  undercutWinnerId: null,
  undercutLoserId: null,
  player: [
    { ...PLAYER_INITIAL_STATE, id: 0 },
    { ...PLAYER_INITIAL_STATE, id: 1 },
    { ...PLAYER_INITIAL_STATE, id: 2 }
  ]
})

/* ------------- Reducers ------------- */

const update = (state, mutations) =>
  Object.assign({}, state, mutations);

export const scoringRequest = (state: Object) => {
  console.log('GameRedux.scoringRequest, state: ' + JSON.stringify(state));
}

export const scoring = (state: Object, { id, action, option }: Object) => {
  console.log('GameRedux.scoring, id: ' + id + ', action: ' + action + ', option: ' + option +  ', state: ' + JSON.stringify(state));
  let playerList = [];
  let newId = null;
  switch (action) {
    case 'UT':
      // toggle undercut scoring
      state.player.forEach(function(p, i) {
        p = update(p, { undercutLoser: false, undercutWinner: false });
        playerList.push(p);
      });
      state = update(state, { undercutScoring: !state.undercutScoring, player: playerList });
      //NavigationActions.playerGrid({type: ActionConst.REFRESH});
      break;
    case 'UL':
      // toggle undercut loser
      state.player.forEach(function(p, i) {
        if (i == id) {
          newId = p.undercutLoser ? null : i;
          p = update(p, { undercutLoser: !p.undercutLoser });
        }
        playerList.push(p);
      });
      state = update(state, { undercutLoserId: newId, player: playerList });
      break;
    case 'UW':
      // toggle undercut winner
      state.player.forEach(function(p, i) {
        if (i == id) {
          newId = p.undercutWinner ? null : i;
          p = update(p, { undercutWinner: !p.undercutWinner });
        }
        playerList.push(p);
      });
      console.log('undercutWinnerId: ' + newId);
      state = update(state, { undercutWinnerId: newId, player: playerList });
      break;
  }
  // Check to see if Undercut scoring is complete - we have a winner & loser
  if (state.undercutScoring && (state.undercutWinnerId !== null) && (state.undercutLoserId !== null)) {
    console.log('Undercut scoring is complete')
    playerList = [];
    state.player.forEach(function(p, i) {
      const stake = (state.bet * (state.activeCount - 1) * 2)
      if (p.undercutWinner) {
        p = update(p, { undercutWinner: false, undercutLoser: false, balance: p.balance + stake });
      } else if (p.undercutLoser) {
        p = update(p, { undercutWinner: false, undercutLoser: false, balance: p.balance - stake });
      } else {
        p = update(p, { undercutWinner: false, undercutLoser: false });
      }
/*
      const winnerDelta = (state.bet * multiplier) * (state.activeCount - 1);
      p = update(p, { balance: p.balance + winnerDelta });
      p = update(p, { balance: p.balance - (state.bet * multiplier) });
*/

      playerList.push(p);
    });
    state = update(state, { undercutScoring: null, undercutLoserId: null, undercutWinnerId: null, player: playerList });
  }
  return state
}

export const gameResetRequest = (state: Object) => {
  console.log('GameRedux.gameResetRequest, state: ' + JSON.stringify(state));
}

export const gameReset = (state = INITIAL_STATE, action) => {
  console.log('GameRedux.gameReset, existing state: ' + JSON.stringify(state) + ', action: ' + JSON.stringify(action));
  state = INITIAL_STATE;
  console.log('GameRedux.gameReset, new state: ' + JSON.stringify(state));
  return state
}

export const gameResetScoresRequest = (state: Object) => {
  console.log('GameRedux.gameResetScoresRequest, state: ' + JSON.stringify(state));
  playerList = [];
}

export const gameResetScores = (state = INITIAL_STATE, action) => {
  //console.log('GameRedux.gameResetScores, existing state: ' + JSON.stringify(state) + ', action: ' + JSON.stringify(action));
  let playerList = [];
  state.player.forEach(function(p) {
    p.balance = 0;
    playerList.push(p);
  });
  state = update(state, { player: playerList })
  console.log('GameRedux.gameResetScores, new state: ' + JSON.stringify(state));
  return state
}

export const playerAddRequest = (state: Object) => {
  console.log('GameRedux.playerAddRequest, state: ' + JSON.stringify(state));
  //state.merge({ addingPlayer: true })
}

// Add player
export const playerAdd = (state = INITIAL_STATE, action) => {
  console.log('GameRedux.playerAdd, existing state: ' + JSON.stringify(state) + ', action: ' + JSON.stringify(action));
  console.log('GameRedux.playerAdd, state.player: ' + JSON.stringify(state.player));
  if (state.playerCount < 5) {
    const playerList = [ ...state.player.slice(0), { ...PLAYER_INITIAL_STATE, id: state.playerCount } ];
    console.log('playerList: ' + JSON.stringify(playerList));
    //playerList.push(PLAYER_INITIAL_STATE);
    state = update(state, { playerCount: state.playerCount + 1, activeCount: state.activeCount + 1, player: playerList })
  }
  //state.merge({ addingPlayer: false })
  console.log('GameRedux.playerAdd, new state: ' + JSON.stringify(state));
  return state
}

// Delete player
export const playerDelete = (state = INITIAL_STATE, action) => {
  if (state.playerCount > 0) {
    state = update(state, { playerCount: state.playerCount - 1, activeCount: state.activeCount - 1 })
  }
  return state
}

export const toggleActiveRequest = (state: Object) => {
  //console.log('GameRedux.playerAddRequest, state: ' + JSON.stringify(state));
  //state.merge({ addingPlayer: true })
}

export const toggleActive = (state: Object, { id }: Object) => {
  console.log('GameRedux.toggleActive, state: ' + JSON.stringify(state));
  let activeCount = state.activeCount;
  let playerList = [];
  state.player.forEach(function(p, i) {
    if (i == id) {
      if (p.active) {
        activeCount--
      } else {
        activeCount++
      }
      console.log('activeCount: ' + activeCount);
      p = update(p, { active: !p.active });
    }
    playerList.push(p);
  });
  state = update(state, { activeCount: activeCount, player: playerList })
  console.log('GameRedux.toggleActive, new state: ' + JSON.stringify(state));
  return state
}

export const betMinusRequest = (state: Object) => {
  //console.log('GameRedux.betMinusRequest, state: ' + JSON.stringify(state));
}

export const betMinus = (state = INITIAL_STATE, action) => {
  state = update(state, { bet: state.bet - 1 })
  return state
}

export const betPlusRequest = (state: Object) => {
  //console.log('GameRedux.betPlusRequest, state: ' + JSON.stringify(state));
}

export const betPlus = (state = INITIAL_STATE, action) => {
  state = update(state, { bet: state.bet + 1 })
  return state
}

export const updateNameRequest = (state: Object) => {
  console.log('GameRedux.updateNameRequest, state: ' + JSON.stringify(state));
}

export const updateName = (state: Object, { id, name }: Object) => {
  console.log('GameRedux.updateName, id: ' + id + ', name: ' + name + ', state: ' + JSON.stringify(state));
  let playerList = [];
  state.player.forEach(function(p, i) {
    if (i == id) {
      p = update(p, { name: name });
      //console.log('updating p: ' + JSON.stringify(p));
    }
    playerList.push(p);
    //console.log('playerList.push: ' + JSON.stringify(playerList));
  });
  //console.log('GameRedux.updateName, playerList: ' + JSON.stringify(playerList));
  state = update(state, { player: playerList })
  console.log('GameRedux.updateName, new state: ' + JSON.stringify(state));
  return state
}

export const wonRequest = (state: Object) => {
  console.log('GameRedux.wonRequest, state: ' + JSON.stringify(state));
}

export const won = (state: Object, { id, multiplier }: Object) => {
  console.log('GameRedux.won, id: ' + id + ', multiplier: ' +  ', state: ' + JSON.stringify(state));
  // Winner adds stake * (activePlayers - 1)
  const winnerDelta = (state.bet * multiplier) * (state.activeCount - 1);
  let playerList = [];
  state.player.forEach(function(p, i) {
    if (i == id) {
      //console.log('winnerDelta: ' + winnerDelta + ', calc: ' + (p.balance + winnerDelta));
      p = update(p, { balance: p.balance + winnerDelta });
    } else {
      if (p.active) {
        p = update(p, { balance: p.balance - (state.bet * multiplier) });
      }
    }
    playerList.push(p);
  });
  state = update(state, { player: playerList })
  console.log('GameRedux.won, new state: ' + JSON.stringify(state));
  return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAME_RESET_SCORES_REQUEST]: gameResetScoresRequest,
  [Types.GAME_RESET_SCORES]: gameResetScores,
  [Types.GAME_RESET_REQUEST]: gameResetRequest,
  [Types.GAME_RESET]: gameReset,
  [Types.PLAYER_ADD_REQUEST]: playerAddRequest,
  [Types.PLAYER_ADD]: playerAdd,
  [Types.PLAYER_DELETE]: playerDelete,
  [Types.TOGGLE_ACTIVE_REQUEST]: toggleActiveRequest,
  [Types.TOGGLE_ACTIVE]: toggleActive,
  [Types.BET_MINUS_REQUEST]: betMinusRequest,
  [Types.BET_MINUS]: betMinus,
  [Types.BET_PLUS_REQUEST]: betPlusRequest,
  [Types.BET_PLUS]: betPlus,
  [Types.UPDATE_NAME_REQUEST]: updateNameRequest,
  [Types.UPDATE_NAME]: updateName,
  [Types.SCORING_REQUEST]: scoringRequest,
  [Types.SCORING]: scoring,
  [Types.WON_REQUEST]: wonRequest,
  [Types.WON]: won
})
