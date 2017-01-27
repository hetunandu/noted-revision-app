// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3
  },
  coin: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  value: {
    fontSize: 20
  }
})
