// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.notedRed,
  },
  btnContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  btnText: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: 16,
    color: 'white'
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costText:{
    fontSize: 18,
    color: 'white'
  }
})
