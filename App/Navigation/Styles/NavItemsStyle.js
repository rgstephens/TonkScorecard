// @flow

import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  navButtonLeft: {
    marginLeft: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    width: Metrics.icons.medium
  },
  navButtonRight: {
    marginLeft: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    width: Metrics.icons.medium
  },
  buttonRowViewStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 5,
//    marginLeft: 0,
//    marginRight: 15
    /*
     flex: 1,
     justifyContent: 'space-around',
     alignItems: 'stretch',
     flexDirection: 'row',
     padding: 8 // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
     */
  },
  betButton: {
  },
  betValue: {
    alignSelf: 'center',
    width: 40,
    height: 30,
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    shadowRadius: 2,
    shadowOpacity: .7,
    shadowColor: 'black',
    elevation: 3
  },
  betText: {
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  }
})
