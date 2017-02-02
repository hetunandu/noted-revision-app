// @flow

import React from 'react'
import { View, Text, TouchableHighlight, Switch, Modal } from 'react-native'
import styles from './Styles/CooldownStyle'
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Loading from './Loading'
import Coins from './Coins'
import PushNotification from 'react-native-push-notification'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class Cooldown extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      timeLeft: "calculating...",
      notify: false,
      modalVisible: false
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

  renderModal() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => this.handleModalClose()}
      >
        <View style={styles.modal}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.modalHeader}>Noted Pro Student</Text>
            <TouchableHighlight
              style={styles.closeBtn}
              underlayColor="grey"
              onPress={() => this.setState({modalVisible: false})}
            >
              <Icon name='close' size={30} color="#333"/>
            </TouchableHighlight>
          </View>
          <View style={styles.point}>
            <Icon name="label" size={10} color="#333"/>
            <Text style={styles.pointText}>No Cooldown</Text>
          </View>
          <View style={styles.point}>
            <Icon name="label" size={10} color="#333"/>
            <Text style={styles.pointText}>No coins</Text>
          </View>
          <View style={styles.point}>
            <Icon name="label" size={10} color="#333"/>
            <Text style={styles.pointText}>Download concepts</Text>
          </View>
          <View style={styles.point}>
            <Icon name="label" size={10} color="#333"/>
            <Text style={styles.pointText}>Serious studying</Text>
          </View>
          <Text>
            Noted Pro students are ones who take their studies seriously.
            Need to study for an important upcoming exam and can't wait
            around for the cooldown to complete? Become a pro and never bother
            about views and coins again.
          </Text>
          <Text>
            Additionally, you have an option of downloading all the concepts for all subjects
            at once so you can study even without an internet connection
          </Text>
          <View style={styles.point}>
            <Icon name="info" size={20} color="#333"/>
            <Text style={styles.pointText}>
              Pro usage is activated on per device basis. You wont be able to access Noted on any other
              device once pro is activated.
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableHighlight
              style={styles.modalBtn}
              onPress={() => this.setState({modalVisible: false})}
            >
              <Text>Maybe Later</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.modalBtn}
              onPress={() => this.handleProPress()}
            >
              <Text>Activate Pro Now</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }


  render () {
    return (
      <View style={styles.container}>
        {this.renderModal()}
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
                onPress={() =>  this.setState({modalVisible: true})}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View>
                    <Text style={styles.skipBtnText}>
                      Become Pro
                    </Text>
                    <Text style={styles.btnInfoText}>
                      Tap for more info
                    </Text>
                  </View>
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

  handleModalClose() {
    this.setState({
      modalVisible: false
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
