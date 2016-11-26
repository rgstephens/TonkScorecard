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
/*
    const dataObjects = [
      {name: 'Greg', balance: 5.0, backgroundColor: Colors.theme3a },
      {name: 'JB', balance: -2.5, backgroundColor: Colors.theme3b },
      {name: 'Scott', balance: -2.5, backgroundColor: Colors.theme3d },
      {name: 'JM', balance: 0, backgroundColor: Colors.theme3d },
      {name: 'Joe', balance: -12.0, backgroundColor: Colors.theme3e }
    ]
*/

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
//      dataSource: ds.cloneWithRows(dataObjects)
//      dataSource: ds.cloneWithRows(props.state.game.player)
//      dataSource: ds.cloneWithRows(props.state.game.player)
//      dataSource: ds.cloneWithRows(props)
      dataSource: ds.cloneWithRows(props.player)
//      dataSource: props.players
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

  /* ***********************************************************
  * STEP 3
  * `_renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} balance={rowData.balance} />
  *************************************************************/
/*
  _renderPlayerCard (rowData, sec, i) {
    const theme = getTheme();
    console.log("rowData: " + JSON.stringify(rowData));
    console.log("sec: " + JSON.stringify(sec));
    console.log("i: " + JSON.stringify(i));

    const onButtonPress = () => {
      console.log('Button has been pressed!');
    };

    return (
      <View style={styles.cardStyle}>
        <View resizeMode="cover" style={[ styles.cardTitleContainer, i == 0 ? styles.cardTitleBackgroundColor1 : i == 1 ? styles.cardTitleBackgroundColor2 : i == 2 ? styles.cardTitleBackgroundColor3 : i == 3 ? styles.cardTitleBackgroundColor4 : styles.cardTitleBackgroundColor5 ]}>
          <Text style={styles.cardTitle}>{rowData.name}</Text>
          <MKButton style={[styles.cardTitleButton, rowData.balance > 0 ? styles.colorPlus : rowData.balance < 0 ? styles.colorMinus : null ]} onPress={() => { console.log('onPress'); }}>
            <Text style={styles.balanceText}>{rowData.balance < 0 ? rowData.balance.toFixed(2) : '+' + rowData.balance.toFixed(2)}</Text>
          </MKButton>
        </View>
        <View style={styles.buttonRowStyle}>
          <MKButton style={styles.buttonStyle} onPress={() => { console.log('onPress'); }}>
            <Text>Won</Text>
          </MKButton>
          <MKButton style={styles.buttonStyle} onPress={() => { console.log('onPress'); }}>
            <Text>Double</Text>
          </MKButton>
          <MKButton style={styles.buttonStyle} onPress={() => { console.log('onPress'); }}>
            <Text>Tonk</Text>
          </MKButton>
          <MKButton style={styles.buttonStyle} onPress={() => { console.log('onPress'); }}>
            <Text>Out</Text>
          </MKButton>
          <MKButton style={styles.buttonStyle} onPress={() => { console.log('onPress'); }}>
            <Text>Undercut</Text>
          </MKButton>
        </View>
      </View>
    )
  }
*/

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
  *************************************************************/
  componentWillReceiveProps (newProps) {
    console.log('PlayerGrid.componentWillReceiveProps, newProps.player: ' + JSON.stringify(newProps.player));
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
    console.log('render PlayerGrid.this.state.dataSource: ' + JSON.stringify(this.state.dataSource));
    return (
      <View style={styles.container}>
        <AlertMessage title='CLick plus to add a player' show={this._noRowData()}/>
        <ListView contentContainerStyle={styles.listContent} dataSource={this.state.dataSource} renderRow={(rowData, sectionID, rowID, highlightRow) => <PlayerCard {...rowData} s={sectionID} id={rowID} />} />
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
