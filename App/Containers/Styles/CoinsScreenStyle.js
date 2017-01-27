// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  mainContainer: ApplicationStyles.screen.mainContainer,
  currentBalance: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1
  },
  currentBalanceText: {
    fontSize: Fonts.size.h5,
    color: Colors.darkGrey
  },
  section: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: '#333'
  },
  sectionHeader: {
    fontSize: Fonts.size.h4,
    textAlign: 'center'
  },
  codeInput: {
    alignSelf: 'center',
    height: 50,
    width: 120,
    fontSize: Fonts.size.input,
    textAlign: 'center'
  },
  btn: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 23
  },
  cost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },

})
