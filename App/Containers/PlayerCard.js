import { connect } from 'react-redux'
import GameActions from '../Redux/GameRedux'

import PlayerCard from '../Components/PlayerCard'

const mapStateToProps = (rowData, state) => {
  console.log('Components/PlayerCard.mapStateToProps rowData: ' + JSON.stringify(rowData))
  console.log('Components/PlayerCard.mapStateToProps state: ' + JSON.stringify(state))
  return {
    state: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNameRequest: (id, name) => dispatch(GameActions.updateName(id, name)),
    wonRequest: (id) => dispatch(GameActions.won(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard)
