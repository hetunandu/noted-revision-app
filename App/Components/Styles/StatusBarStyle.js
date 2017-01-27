// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    padding: Metrics.baseMargin,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.notedBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewsCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewsCounterText:{
    fontSize: 20,
    color: '#fff'
  }
})
