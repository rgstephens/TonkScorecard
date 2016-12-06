// @flow

import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'
import { MKColor } from 'react-native-material-kit'

// RootContainer.js
// Containers/Styles/RootContainerStyle.applicationView  { flex: 1 }
// NavigationRouter
// PlayerGridStyle - container { flex: 1 }

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
//    alignItems: 'stretch',
//    backgroundColor: '#F5FCFF',
    backgroundColor: 'transparent',
    padding: 6,
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: Platform.OS === 'android' ? Metrics.navBarHeight : Metrics.navBarHeight,
  },

  // child of container
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },

/*
  buttonRowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10 // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
  },
*/
  // child of
  buttonRowStyle: {
//    flex: 1,
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    justifyContent: 'flex-end',
//    height: 80,
//    padding: 10 // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
    backgroundColor: 'transparent',
  },

  plusButtonStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 15,
    marginRight: 15,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'red',
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: .7,
    elevation: 3
  },

  buttonRowStyle: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingBottom: 0
/*
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'row',
    padding: 8 // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
*/
  },

  // child of buttonRowStyle
  buttonStyle: {
    paddingLeft: 5,
    paddingRight: 5
  },

  // child of buttonRowStyle
  regularButtonStyle: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 30,
//    width: 110,
    height: 30,
    borderRadius: 2,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: .7
  },

  // child of buttonRowStyle
  buttonLeftStyle: {
//    alignSelf: 'flex-start',
    backgroundColor: Colors.background
  },

  // child of buttonRowStyle
  buttonRightStyle: {
//    alignSelf: 'flex-end',
    backgroundColor: Colors.background1b
  },

  buttonText: {
    color: 'white'
  },

  footer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: Colors.background,
    padding: 6,
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: Platform.OS === 'android' ? Metrics.navBarHeight + 56 : Metrics.navBarHeight,
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
