// @flow

import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'
import { MKColor } from 'react-native-material-kit'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  // child of listContent from PlayerGrid ListView
  cardStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
    shadowColor: 'rgba(0, 0, 0, 0.22)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    },
    elevation: 10,
  },

  // child of cardStyle
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    //marginBottom: 20
    //paddingVertical: 10
  },

  cardTitle: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'white',
    padding: 4,
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
  },

  // child of cardTitleContainer
  nameInput: {
    flex: 1,
//    top: 20,
//    left: 8,
    marginVertical: 10,
    marginHorizontal: 5,
    height: 30,
    backgroundColor: 'transparent',
    padding: 4,
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
  },

  // child of cardTitleContainer
  balanceButton: {
    alignSelf: 'flex-end',
    width: 70,
    height: 30,
    paddingVertical: 5,
    marginBottom: 10,
    marginRight: 10,
    paddingRight: 10,
    borderRadius: 3,
    shadowRadius: 2,
    shadowOpacity: .7,
    shadowColor: 'black',
    elevation: 2
  },
  colorPlus: {
    backgroundColor: Colors.mediumAquamarine,
  },
  colorMinus: {
    backgroundColor: Colors.fire,
  },

  balanceText: {
    alignSelf: 'flex-end'
  },
  cardTitleBackgroundColor1: {
    backgroundColor: Colors.background1a,
  },
  cardTitleBackgroundColor2: {
    backgroundColor: Colors.background1b,
  },
  cardTitleBackgroundColor3: {
    backgroundColor: Colors.background1c,
  },
  cardTitleBackgroundColor4: {
    backgroundColor: Colors.background1d,
  },
  cardTitleBackgroundColor5: {
    backgroundColor: Colors.background1e,
  },

  // child of cardStyle
  buttonRowStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10 // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
  },

  // child of
  buttonRowSpaceBetween: {
    justifyContent: 'space-between'
  },

  // child of
  buttonRowCenter: {
    justifyContent: 'center'
  },

  // child of buttonRowStyle
  buttonStyle: {
    borderRadius: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 2
  },

  // child of buttonStyle
  buttonOn: {
    backgroundColor: Colors.background
  },

  // child of buttonStyle
  buttonOnLose: {
    backgroundColor: 'red'
  },

  // child of buttonStyle
  buttonTextOn: {
    color: 'white'
  },

  // child of buttonStyle
  buttonText: {
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
