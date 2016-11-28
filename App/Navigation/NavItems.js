// @flow

import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'
import { getTheme, setTheme, MKButton, MKColor } from 'react-native-material-kit'
// https://material.io/icons/
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-left'
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton () {
    return (
      <TouchableOpacity onPress={openDrawer}>
        <Icon name='bars'
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  betButton () {
    return (
      <View style={styles.buttonRowViewStyle}>
        <TouchableOpacity onPress={openDrawer}>
          <MKButton style={styles.betButton} fab={true} rippleColor={`rgba(${MKColor.RGBIndigo},.2)`}
                    rippleLocation="center" onPress={this.handleAddBet}>
            <Text><MaterialIcon name="remove" size={20} color={'white'}/></Text>
          </MKButton>
        </TouchableOpacity>
        <MKButton style={[styles.betValue]}>
          <Text style={styles.betText}>$ 1</Text>
        </MKButton>
        <TouchableOpacity onPress={openDrawer}>
          <MKButton style={styles.betButton} fab={true} rippleColor={`rgba(${MKColor.RGBIndigo},.2)`}
                    rippleLocation="center" onPress={this.handleAddBet}>
            <Text><MaterialIcon name="add" size={20} color={'white'}/></Text>
          </MKButton>
        </TouchableOpacity>
      </View>
    )
  },

}
