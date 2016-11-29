import { connect } from 'react-redux'
import GameActions from '../Redux/GameRedux'

import PlayerCard from '../Components/PlayerCard'

const mapStateToProps = (state) => {
  console.log('PlayerCard.mapStateToProps.PlayerCard: ' + JSON.stringify(state))
  return {
    state: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActiveRequest: (id) => dispatch(GameActions.toggleActive(id)),
    updateNameRequest: (id, name) => dispatch(GameActions.updateName(id, name)),
    wonRequest: (id, multiplier) => dispatch(GameActions.won(id, multiplier))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard)
