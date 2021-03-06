import React, { PropTypes } from 'react'
import { View, Text, ListView, Image, Button, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { getTheme, setTheme, MKButton, MKColor } from 'react-native-material-kit'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import PlayerCard from './PlayerCard'
import GameActions from '../Redux/GameRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/PlayerGridStyle'

class PlayerGrid extends React.Component {

/*
  state: {
    dataSource: Object
  }
*/

  constructor (props) {
    super(props)
    console.log('PlayerGrid constructor props.players: ' + JSON.stringify(props.player));

    const rowHasChanged = (r1, r2) => r1 !== r2
/*
    const rowHasChanged = (r1, r2) => {
      console.log('rowHasChanged, r1: ' + JSON.stringify(r1) + ', r2: ' + JSON.stringify(r2))
      if (r1 !== r2) {
        console.log('true')
        return true
      } else {
        console.log('false')
        return false
      }
    }
*/
    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    console.log('pre rowLength: ' + ds.getRowCount())
    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.player)
    }
    console.log('post rowLength: ' + this.state.dataSource.getRowCount())
    console.log('post this.state.dataSource: ' + JSON.stringify(this.state.dataSource))
  }

  handlePressAddPlayer = () => {
    this.props.addPlayer()
  }

  handlePressGameReset = () => {
    this.props.gameResetRequest()
  }

  handlePressScoresReset = () => {
    this.props.gameResetScoresRequest()
  }

  componentWillReceiveProps (newProps) {
    console.log('PlayerGrid.componentWillReceiveProps, newProps: ' + JSON.stringify(newProps));
    if (newProps.player) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.player)
      })
    }
  }

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
//         <ListView contentContainerStyle={styles.listContent} dataSource={this.state.dataSource} renderRow={this._renderPlayerCard} />
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  // https://github.com/xinthink/rnmk-demo/blob/master/app/cards.js
  render () {
    console.log('render PlayerGrid.this.props: ' + JSON.stringify(this.props));
    console.log('render PlayerGrid.this.state: ' + JSON.stringify(this.state));
    //console.log('render PlayerGrid.this.state.dataSource: ' + JSON.stringify(this.state.dataSource));
    return (
      <View style={styles.container}>
        <AlertMessage title='CLick plus to add a player' show={this._noRowData()}/>
        <ListView contentContainerStyle={styles.listContent} dataSource={this.state.dataSource}
                  renderRow={(rowData, sectionID, rowID, highlightRow) => <PlayerCard {...rowData} undercutScoring={this.props.game.undercutScoring}
                              undercutLoserId={this.props.game.undercutLoserId} undercutWinnerId={this.props.game.undercutWinnerId} id={rowID}/>}/>
        { this.props.game.playerCount < 5 ?
        <MKButton style={styles.plusButtonStyle} fab={true} rippleColor={`rgba(${MKColor.RGBIndigo},.2)`}
                  rippleLocation="center" onPress={this.handlePressAddPlayer}>
          <Text><MaterialIcon name="add" size={30} color={'white'}/></Text>
        </MKButton>
          : null }
        <View style={styles.buttonRowStyle}>
          <MKButton style={[styles.regularButtonStyle, styles.buttonLeftStyle]} onPress={this.handlePressScoresReset}>
            <Text style={styles.buttonText}>Reset Scores</Text>
          </MKButton>
          <MKButton style={[styles.regularButtonStyle, styles.buttonRightStyle]} onPress={this.handlePressGameReset}>
            <Text style={styles.buttonText}>Reset Game</Text>
          </MKButton>
        </View>
      </View>
    )
  }
}

PlayerGrid.propTypes = {
  player: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
  }).isRequired),
  addPlayer: PropTypes.func,
  gameResetScoresRequest: PropTypes.func,
  gameResetRequest: PropTypes.func
}

const mapStateToProps = (state) => {
  console.log('PlayerGrid.mapStateToProps, state: ' + JSON.stringify(state));
  return {
    game: state.game,
    player: state.game.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: () => dispatch(GameActions.playerAdd()),
    gameResetRequest: () => dispatch(GameActions.gameReset()),
    gameResetScoresRequest: () => dispatch(GameActions.gameResetScores())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerGrid)
