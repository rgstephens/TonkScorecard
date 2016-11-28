// @flow

import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    //console.log('RootContainer props: ' + JSON.stringify(this.props));
    //console.log('RootContainer state: ' + JSON.stringify(this.state));
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter {...this.props} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('RootContainer.mapStateToProps, state: ' + JSON.stringify(state));
  return {
    game: state.game
  }
}

const mapStateToDispatch = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapStateToDispatch)(RootContainer)
