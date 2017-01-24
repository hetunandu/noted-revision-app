// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  summary:{
    backgroundColor: Colors.notedBlue,
    flex: 1,
    padding: 30,
    justifyContent: 'center'
  },
  table: {
    borderWidth: 3,
    borderColor: Colors.snow
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  rowHead: {
    fontSize: Fonts.size.h5,
    color: Colors.snow
  },
  rowValue: {
    fontSize: Fonts.size.h4,
    color: Colors.snow
  },
  pointsContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  pointsDisplay: {
    textAlign: 'center',
    fontSize: Fonts.size.h2
  },
  moreBtn: {
    margin: 10,
    backgroundColor: Colors.charcoal,
    padding: 10
  }
})
