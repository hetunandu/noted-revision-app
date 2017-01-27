// @flow

import React from 'react'
import { View, Text, WebView } from 'react-native'
import { connect } from 'react-redux'
import Loading from '../Components/Loading'
import PaymentActions from '../Redux/PaymentRedux'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

// Styles
import styles from './Styles/PayOnlineScreenStyle'

class PayOnlineScreen extends React.Component {

  componentDidMount() {
    this.props.requestPayment()

    this.setInterval(this.checkStatus, 5000);
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        {this.props.payment.fetching ? (<Loading />) : (
          <WebView source={{uri: this.props.payment.request.longurl}} />
        )}
      </View>
    )
  }

  checkStatus() {
    this.props.paymentStatus(this.props.payment.key)
  }

}

reactMixin(PayOnlineScreen.prototype, TimerMixin);

const mapStateToProps = (state) => {
  return {
    payment: state.payment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPayment: () => dispatch(PaymentActions.paymentRequest()),
    paymentStatus: (key) => dispatch(PaymentActions.statusRequest(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayOnlineScreen)
