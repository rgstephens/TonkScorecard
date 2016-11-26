import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { INITIAL_STATE as PLAYER_INITIAL_STATE } from './PlayerRedux'

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
  playerIn: ['name'],
  playerOut: ['name'],
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
  player: [
    { ...PLAYER_INITIAL_STATE, id: 0, name: 'Greg' },
    { ...PLAYER_INITIAL_STATE, id: 1 },
    { ...PLAYER_INITIAL_STATE, id: 2 }
  ]
})

/* ------------- Reducers ------------- */

const update = (state, mutations) =>
  Object.assign({}, state, mutations);

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

// Add player request
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

// Player in
export const playerIn = (state = INITIAL_STATE, action) => {
  if (state.playerCount < 5) {
    state = update(state, { activeCount: state.activeCount + 1 })
  }
  return state
}

// Player Out
export const playerOut = (state = INITIAL_STATE, action) => {
  if (state.playerCount > 0) {
    state = update(state, { activeCount: state.activeCount - 1 })
  }
  return state
}

export const updateNameRequest = (state: Object) => {
  console.log('GameRedux.updateNameRequest, state: ' + JSON.stringify(state));
}

export const updateName = (state: Object, { id, name }: Object) => {
  //console.log('GameRedux.updateName, id: ' + id + ', name: ' + name + ', state: ' + JSON.stringify(state));
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
      p = update(p, { balance: p.balance - (state.bet * multiplier) });
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
  [Types.PLAYER_IN]: playerIn,
  [Types.PLAYER_OUT]: playerOut,
  [Types.UPDATE_NAME_REQUEST]: updateNameRequest,
  [Types.UPDATE_NAME]: updateName,
  [Types.WON_REQUEST]: wonRequest,
  [Types.WON]: won
})
