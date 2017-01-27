// @flow

import React from 'react'
import { View, Text, TouchableHighlight} from 'react-native'
import styles from './Styles/StatusBarStyle'
import Coins from './Coins'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'

export default class StatusBar extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.viewsCounter}>
          <Icon name="visibility" color="#fff" size={20} style={{padding: 5}}/>
          <Text style={styles.viewsCounterText}>
            {this.props.session.views}
          </Text>
        </View>

        <TouchableHighlight
          underlayColor={Colors.notedBlueDarker}
          onPress={() => this.handleCoinBalancePress()}
        >
          <View>
            <Coins value={this.props.coins.balance} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <Icon name="settings" color="#fff" size={25}/>
        </TouchableHighlight>

      </View>
    )
  }

  handleCoinBalancePress() {
    NavigationActions.coins()
  }
}

// Prop type warnings
StatusBar.propTypes = {
  session: React.PropTypes.object.isRequired,
  coins: React.PropTypes.object.isRequired
}
//
// // Defaults for props
// StatusBar.defaultProps = {
//   someSetting: false
// }
