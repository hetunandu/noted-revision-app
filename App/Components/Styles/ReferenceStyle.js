// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  reference: {
    marginBottom: 10,
    padding: 10
  },
  refText: {
    color: '#fff',
    fontSize: 18,
  },
  refLink: {
    color: '#fff',
    fontSize: 16
  },
  refTitle:{
    textAlign: 'center',
    color: "#fff",
    marginTop: 10,
    fontSize: 30
  }
})
