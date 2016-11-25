// @flow

import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'
import { MKColor } from 'react-native-material-kit'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 6,
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: Platform.OS === 'android' ? Metrics.navBarHeight + 56 : Metrics.navBarHeight,
  },

  // child of container
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },


  // child of buttonRowStyle
  plusButtonStyle: {
    paddingLeft: 5,
    paddingRight: 5
  },

  containerOrig: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    flexBasis: 100,
    height: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    borderRadius: Metrics.smallMargin
  },
  cardImage: {
    flex: 1,
    height: 40,
  },
  cardTitleContainerPlus:{
    flex: 1,
    height: 60,
    backgroundColor: Colors.mediumAquamarine,
  },
  cardTitleContainerMinus:{
    flex: 1,
    height: 60,
  },
  cardTitle2:{
    position: 'absolute',
    top: 120,
    left: 26,
    backgroundColor: 'transparent',
    padding: 16,
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  rowPlus: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.mediumAquamarine,
    borderRadius: Metrics.smallMargin
  },
  rowMinus: {
    flex: 1,
    flexBasis: 100,
    height: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center'
  },
  buttonContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: .7,
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 10
  },
  buttonTeal: {
    backgroundColor: MKColor.Teal,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: .7,
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 10
  },
  buttonTextWhite: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonTextBlack: {
    color: 'black',
    fontWeight: 'bold'
  }
})
