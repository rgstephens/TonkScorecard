// @flow

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Components/CustomNavBar'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import PlayerGrid from '../Containers/PlayerGrid'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const update = (state, mutations) =>
  Object.assign({}, state, mutations);

class NavigationRouter extends Component {

  handleBetPlus = () => {
    console.log('handleBetPlus, state: ' + JSON.stringify(this.state));
    console.log('handleBetPlus, props: ' + JSON.stringify(this.props));
    this.state = update(this.state, { bet: this.state.bet + 1 })
    //this.props.betPlus()
  }

  componentWillReceiveProps (newProps) {
    console.log('NavigationRouter.componentWillReceiveProps, newProps: ' + JSON.stringify(newProps));
    if (newProps.game) {
      this.setState({
        game: newProps.game
//        game: this.state.game.cloneWithRows(newProps.game)
      })
    }
  }

  render () {
    console.log('NavigationRouter, props: ' + JSON.stringify(this.props));
    console.log('NavigationRouter, state: ' + JSON.stringify(this.state));
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>

            <Scene initial key='playerGrid' component={PlayerGrid} title='Tonk' renderLeftButton={NavItems.hamburgerButton} renderRightButton={() => NavItems.betButton(this.handleBetPlus)}/>
            <Scene key='presentationScreen' component={PresentationScreen} title='Ignite' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
            <Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections' />
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
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
/*
    addPlayer: () => dispatch(GameActions.playerAdd()),
    gameResetRequest: () => dispatch(GameActions.gameReset()),
    gameResetScoresRequest: () => dispatch(GameActions.gameReset())
*/
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
//export default NavigationRouter
