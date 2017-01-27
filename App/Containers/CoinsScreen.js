// @flow

import React from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableHighlight, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import Loading from '../Components/Loading'
import Coins from '../Components/Coins'
import CoinsActions from '../Redux/CoinsRedux'

import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/CoinsScreenStyle'


class CoinsScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      code: ""
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.currentBalance}>
          <Text style={styles.currentBalanceText}>
            Current Balance
          </Text>
          <Coins value={this.props.coins.balance} dark/>
        </View>
        <View style={styles.section}>
          <KeyboardAvoidingView behavior='position'>
            <Text style={styles.sectionHeader}>Redeem a code</Text>
            <TextInput
              style={styles.codeInput}
              onChangeText={(text) => this.setState({code: text})}
              value={this.state.code}
              placeholder="code"
              autoCorrect={false}
              placeholderTextColor="#777"
              borderBottomColor="#50537f"
              autoCapitalize="characters"
              maxLength={5}
            />
            <TouchableHighlight
              style={[styles.btn, {backgroundColor: 'green'}]}
              onPress={() => this.submitCode()}
              disabled={this.props.coins.fetching}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableHighlight>
            {this.props.coins.fetching && <Loading />}

          </KeyboardAvoidingView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Buy coins</Text>
          <View style={styles.cost}>
            <Coins value={500} dark/>
            <Text style={{fontSize: 20}}> for &#8377;50</Text>
          </View>

          <TouchableHighlight
            style={[styles.btn, {backgroundColor: 'steelblue'}]}
            onPress={() => this.payOnline()}
          >
            <Text style={styles.btnText}>Pay Online</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.btn, {backgroundColor: '#50537f'}]}
            onPress={() => this.offlineBuy()}
          >
            <Text style={styles.btnText}>Pay Offline</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  submitCode() {
    if(this.state.code.length < 4 || this.state.code.length > 5){
      ToastAndroid.show('Error: Check code', ToastAndroid.LONG)
    }else{
      this.props.redeemCode(this.state.code)
      this.setState({
        code: ""
      })
    }
  }

  payOnline() {
    NavigationActions.payOnline()
  }

  offlineBuy() {
    NavigationActions.payOffline()
  }
}

const mapStateToProps = (state) => {
  return {
    coins: state.coins
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    redeemCode: (code) => dispatch(CoinsActions.redeemRequest(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsScreen)
