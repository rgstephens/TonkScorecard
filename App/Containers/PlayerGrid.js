import React, { PropTypes } from 'react'
import { View, Text, ListView, Image, Button } from 'react-native'
import { connect } from 'react-redux'
import { getTheme, setTheme, MKButton } from 'react-native-material-kit'
import PlayerCard from './PlayerCard'
import GameActions from '../Redux/GameRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/PlayerGridStyle'

class PlayerGrid extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    console.log('PlayerGrid constructor props.players: ' + JSON.stringify(props.player));
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    console.log('pre rowLength: ' + ds.getRowCount())
    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.player)
    }
    console.log('post rowLength: ' + this.state.dataSource.getRowCount())
    console.log('PlayerGrid/constructor this.state.dataSource: ' + JSON.stringify(this.state.dataSource))
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
    console.log('PlayerGrid.componentWillReceiveProps, newProps.player: ' + JSON.stringify(newProps.player));
    if (newProps.player) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.player)
      })
      console.log('PlayerGrid/componentWillReceiveProps this.state.dataSource: ' + JSON.stringify(this.state.dataSource))
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
    console.log('render PlayerGrid.this.state.dataSource: ' + JSON.stringify(this.state.dataSource));
    return (
      <View style={styles.container}>
        <AlertMessage title='CLick plus to add a player' show={this._noRowData()}/>
        <ListView contentContainerStyle={styles.listContent} dataSource={this.state.dataSource} renderRow={(rowData) => <Text> {rowData.name}, {rowData.balance}, {rowData.active} </Text>} />
{/*
 <ListView contentContainerStyle={styles.listContent} dataSource={this.state.dataSource} renderRow={(rowData) => <PlayerCard {...rowData}  />} />
 <ListView contentContainerStyle={styles.listContent} dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowID, highlightRow) => <PlayerCard {...rowData} s={sectionID} id={rowID} />} />
*/}
        <MKButton style={styles.plusButtonStyle} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onPress={this.handlePressAddPlayer}>
          <Text>Add</Text>
        </MKButton>
        <MKButton style={styles.plusButtonStyle} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onPress={this.handlePressScoresReset}>
          <Text>Reset Scores</Text>
        </MKButton>
        <MKButton style={styles.plusButtonStyle} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onPress={this.handlePressGameReset}>
          <Text>Reset Game</Text>
        </MKButton>
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
  gameResetRequest: PropTypes.func
}

const mapStateToProps = (state) => {
  console.log('PlayerGrid.mapStateToProps, state: ' + JSON.stringify(state));
  console.log('PlayerGrid.mapStateToProps, state.game.player: ' + JSON.stringify(state.game.player));
  return {
    player: state.game.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: () => dispatch(GameActions.playerAdd()),
    gameResetRequest: () => dispatch(GameActions.gameReset()),
    gameResetScoresRequest: () => dispatch(GameActions.gameReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerGrid)
