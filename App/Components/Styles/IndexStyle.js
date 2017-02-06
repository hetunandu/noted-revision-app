// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  indexHeader:{
    padding: 10,
    fontSize: Fonts.size.h5,
  },
  chapterContainer: {
    padding: 5,
    backgroundColor: Colors.background
  },
  chapterName: {
    textAlign: 'center',
    fontSize: 23,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  conceptContainer:{
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  conceptDataContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  readCount:{
    alignItems:'center',
    justifyContent: 'center'
  },
  conceptName: {
    flex:7,
    fontSize: 20
  },
  conceptActions: {
    backgroundColor: Colors.frost,
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  conceptActionContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  conceptActionText: {
    fontSize: 10
  },
  separator: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8E8E8E',
  },
})
