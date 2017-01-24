// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    padding: 10,
    height: 40,
    backgroundColor: Colors.notedBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  coinsCounterText: {
    fontSize: 20,
    color: '#fff'
  },
  viewsCounterText:{
    fontSize: 20,
    color: '#fff'
  }
})
