// @flow

import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './Styles/CooldownStyle'
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Loading from './Loading'


export default class Cooldown extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      timeLeft: "calculating..."
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
        <View style={{flex: 2, alignItems: 'center', justifyContent:'center'}}>
          <Text style={styles.cooldownText}>Cooldown</Text>
          <Text style={styles.moreViewsText}>More views in</Text>
          <Text style={styles.timeLeftText}>{this.state.timeLeft}</Text>
        </View>
        <View style={{flex: 3, alignItems: 'center', justifyContent:'center'}}>
          {this.props.session.fetching ? <Loading light/> : (
            <TouchableHighlight
              underlayColor="#555"
              style={styles.skipButton}
              onPress={() => this.handleSkipPress()}
            >
              <Text style={styles.skipBtnText}>
                Skip cooldown for {this.props.session.reset_cost} coins
              </Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
    )
  }


  handleSkipPress() {
    this.props.onCooldownSkipPress()
  }
}

reactMixin(Cooldown.prototype, TimerMixin)


// Prop type warnings
Cooldown.propTypes = {
  session: React.PropTypes.shape({
    views: React.PropTypes.number,
    reset_cost: React.PropTypes.number,
    session_seconds: React.PropTypes.number,
    created_at: React.PropTypes.string,
    updated_at: React.PropTypes.string
  }),
  onCooldownSkipPress: React.PropTypes.func
}
//
// // Defaults for props
// Cooldown.defaultProps = {
//   someSetting: false
// }
