// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerText: {
    fontSize: 20,
    padding: 5
  },
  rep: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  repDetails:{
    flex: 5
  },
  repName: {
    fontSize: 20,
    color: '#333'
  },
  repInfo:{
    fontWeight: 'bold'
  },
  repContact: {
    flex: 2,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
