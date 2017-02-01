// @flow

import React from 'react'
import { View, Text, TouchableHighlight, Switch } from 'react-native'
import styles from './Styles/CooldownStyle'
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Loading from './Loading'
import Coins from './Coins'
import PushNotification from 'react-native-push-notification'


export default class Cooldown extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      timeLeft: "calculating...",
      notify: false
    }
  }

  componentDidMount(){
    this.setInterval(this.countdown, 1000);
  }


  countdown(){
    const {session} = this.props

    const sessionStart = new Date(session.created_at)

    const sessionEnd = sessionStart.setSeconds(sessionStart.getSeconds() + session.session_seconds)

    const time_left = sessionEnd - new Date()

    if (time_left < 0){
      this.clearInterval()
    }else {
      const _second = 1000;
      const _minute = _second * 60;
      const _hour = _minute * 60;
      const _day = _hour * 24;

      const hours = Math.floor((time_left % _day) / _hour);
      const minutes = Math.floor((time_left % _hour) / _minute);
      const seconds = Math.floor((time_left % _minute) / _second);

      this.setState({
        timeLeft: `${hours}h ${minutes}m ${seconds}s`
      })
    }
  }


  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cooldownCounter}>
          <Text style={styles.cooldownText}>Cooldown</Text>
          <Text style={styles.moreViewsText}>More views in</Text>
          <Text style={styles.timeLeftText}>{this.state.timeLeft}</Text>
        </View>
        <View style={{flex: 3, alignItems: 'center', justifyContent:'center'}}>
          {this.props.session.fetching ? <Loading /> : (
            <View>
              <View style={styles.notifyContainer}>
                <Text style={styles.notifyText}>
                  Notify when cooldown completes?
                </Text>
                <Switch
                  value={this.state.notify}
                  onValueChange={(value) => this.handleNotifyOptionChanged(value)}
                />
              </View>
              <TouchableHighlight
                underlayColor="#555"
                style={styles.skipButton}
                onPress={() => this.handleSkipPress()}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={styles.skipBtnText}>
                    Skip cooldown
                  </Text>
                  <Coins value={this.props.session.reset_cost}/>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#555"
                style={styles.skipButton}
                onPress={() => this.handleProPress()}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={styles.skipBtnText}>
                    Buy pro
                  </Text>
                  <Coins value={this.props.session.pro_cost}/>
                </View>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    )
  }


  handleSkipPress() {
    this.props.onCooldownSkipPress()
  }

  handleProPress() {
    this.props.onBuyProPressed()
  }

  handleNotifyOptionChanged(value) {
    if(value === true){
      const sessionStart = new Date(this.props.session.created_at)

      const sessionEnd = sessionStart.setSeconds(sessionStart.getSeconds() + this.props.session.session_seconds)

      PushNotification.localNotificationSchedule({
        message: "Cooldown complete",
        bigText: "Time to start revising again",
        color: "red",
        date: new Date(sessionEnd),
        repeatType: 'day', // repeat every day,
        group: "cooldown"
      });
    }else{
      PushNotification.cancelLocalNotifications({group: "cooldown"});
    }

    this.setState({
      notify: value
    })

  }
}

reactMixin(Cooldown.prototype, TimerMixin)


// Prop type warnings
Cooldown.propTypes = {
  session: React.PropTypes.shape({
    views: React.PropTypes.number,
    reset_cost: React.PropTypes.number,
    pro_cost: React.PropTypes.number,
    session_seconds: React.PropTypes.number,
    created_at: React.PropTypes.string,
    updated_at: React.PropTypes.string
  }),
  onCooldownSkipPress: React.PropTypes.func,
  onBuyProPressed: React.PropTypes.func
}
//
// // Defaults for props
// Cooldown.defaultProps = {
//   someSetting: false
// }
