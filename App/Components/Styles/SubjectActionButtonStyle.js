// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: Colors.notedRed,
  },
  btnContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  btnText: {
    fontSize: 20,
    color: 'white'
  }
})
