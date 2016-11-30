// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Colors, Metrics, Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
//import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  handlePlayerGrid = () => {
    this.toggleDrawer()
    NavigationActions.playerGrid()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Icon style={styles.logo} name='ios-calculator' size={20} color={Colors.broadmoorBlue} />
        <DrawerButton text='Scorecard' onPress={this.handlePlayerGrid} />
        <DrawerButton text='About' onPress={this.handlePressDevice} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
