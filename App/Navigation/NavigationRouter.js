// @flow

import React, { Component, PropTypes } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { connect } from 'react-redux'
import { Scene, Router, ActionConst, Actions as NavigationActions } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Components/CustomNavBar'
import { getTheme, setTheme, MKButton, MKColor } from 'react-native-material-kit'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

// screens identified by the router
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import PlayerGrid from '../Containers/PlayerGrid'
import GameActions from '../Redux/GameRedux'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

class NavigationRouter extends Component {

  constructor (props) {
    super(props)
    console.log('NavigationRouter constructor props.players: ' + JSON.stringify(props));
    this.state = props;
    this.handleBetMinus = this.handleBetMinus.bind(this);
    this.handleBetPlus = this.handleBetPlus.bind(this);
/*
    this.setState({
      game: props.game
    })
*/
  }

  betButton = (handlePlus, handleMinus, bet) => {
    console.log('this.betButton, bet: ' + bet);
    console.log('this.betButton, this.props: ' + JSON.stringify(this.props));
    console.log('this.betButton, this.state: ' + JSON.stringify(this.state));
    return (
      <View style={styles.buttonRowViewStyle}>
        <TouchableOpacity onPress={openDrawer}>
          <MKButton style={styles.betButton} fab={true} rippleColor={`rgba(${MKColor.RGBIndigo},.2)`}
                    rippleLocation="center" onPress={handleMinus}>
            <Text><MaterialIcon name="remove" size={20} color={'white'}/></Text>
          </MKButton>
        </TouchableOpacity>
        <MKButton style={[styles.betValue]}>
          <Text style={styles.betText}>$ {this.state.game.bet}</Text>
        </MKButton>
        <TouchableOpacity onPress={openDrawer}>
          <MKButton style={styles.betButton} fab={true} rippleColor={`rgba(${MKColor.RGBIndigo},.2)`}
                    rippleLocation="center" onPress={handlePlus}>
            <Text><MaterialIcon name="add" size={20} color={'white'}/></Text>
          </MKButton>
        </TouchableOpacity>
      </View>
    )
  }

  handleBetMinus = () => {
    //console.log('handleBetPlus, state: ' + JSON.stringify(this.state));
    //console.log('handleBetPlus, props: ' + JSON.stringify(this.props));
    this.props.betMinusRequest()
    // https://github.com/aksonov/react-native-router-flux/blob/master/docs/OTHER_INFO.md
    NavigationActions.playerGrid({type: ActionConst.REFRESH});
  }

  handleBetPlus = () => {
    //console.log('handleBetPlus, state: ' + JSON.stringify(this.state));
    //console.log('handleBetPlus, props: ' + JSON.stringify(this.props));
    this.props.betPlusRequest()
    NavigationActions.playerGrid({type: ActionConst.REFRESH});
  }

/*
  componentDidMount (props) {
    console.log('NavigationRouter.componentDidMount, props: ' + JSON.stringify(props));
    if (props) {
      this.setState({
        game: props.game
      })
    }
  }
*/

  componentWillReceiveProps (newProps) {
    console.log('NavigationRouter.componentWillReceiveProps, newProps: ' + JSON.stringify(newProps));
    console.log('NavigationRouter.componentWillReceiveProps, state: ' + JSON.stringify(this.state));
    //this.setState({ game: newProps.game })
    this.state = newProps;
    console.log('NavigationRouter.componentWillReceiveProps, updated state: ' + JSON.stringify(this.state));
  }

  render () {
    console.log('NavigationRouter, props: ' + JSON.stringify(this.props));
    console.log('NavigationRouter, state: ' + JSON.stringify(this.state));
    let bet = this.state ? this.state.game.bet : this.props.game.bet;
    console.log('NavigationRouter, bet: ' + bet);
    console.log('NavigationRouter, this.state.game.bet: ' + this.state.game.bet);
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>

            <Scene initial key='playerGrid' component={PlayerGrid} title='Tonk' renderLeftButton={NavItems.hamburgerButton}
                   renderRightButton={() => this.betButton(this.handleBetPlus, this.handleBetMinus, this.state.game.bet)}/>
            <Scene key='theme' component={ThemeScreen} title='Theme' />

            {/* Custom navigation bar example */}
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' navBar={CustomNavBar} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

NavigationRouter.propTypes = {
  game: PropTypes.shape({
    playerCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    bet: PropTypes.number.isRequired
  }),
  handleBetPlus: PropTypes.func,
  handleBetMinus: PropTypes.func
}

const mapStateToProps = (state) => {
  console.log('NavigationRouter.mapStateToProps, state: ' + JSON.stringify(state));
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    betPlusRequest: () => dispatch(GameActions.betPlus()),
    betMinusRequest: () => dispatch(GameActions.betMinus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
//export default NavigationRouter
