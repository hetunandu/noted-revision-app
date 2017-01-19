// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.notedBlue
  },
  logo: {
    width: Metrics.screenWidth,
    height: 100
  }
})
