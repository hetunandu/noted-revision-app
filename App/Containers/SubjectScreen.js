// @flow

import React from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView, ToastAndroid, Alert } from 'react-native'
import Loading from '../Components/Loading'
import SubjectTab from '../Components/SubjectTab'
import StatusBar from '../Components/StatusBar'
import { connect } from 'react-redux'
import ConceptActions from '../Redux/ConceptRedux'
import IndexActions from '../Redux/IndexRedux'
import SessionActions from '../Redux/SessionRedux'
import Cooldown from '../Components/Cooldown'
import { Colors } from '../Themes'
import styles from './Styles/SubjectScreenStyle'
import { tracker } from '../Lib/googleAnalytics'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';


class SubjectScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      index: 0
    };
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{backgroundColor: Colors.snow}}
      style={{backgroundColor: Colors.notedBlue}}
    />;
  };

  _renderScene = ({ route }) => {

    const subject = route

    return (
      <SubjectTab
        subject={subject}

        onSubjectActionPress={(mode) => this.handleSubjectActionPress(subject.key, mode)}
        onSubjectIndexPress={() => this.handleSubjectIndexPress(subject)}
      />
    )

  };

  componentDidMount(){
    tracker.trackScreenView('Subjects');
  }

  render () {
    const { subjects, session, coins} = this.props

    const routes = subjects.list.map(subject => {
      return Object.assign({}, subject, {
        title: subject.name
      })
    })

    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        <StatusBar coins={coins} session={session} />
        {session.views === 0 ? (
          <Cooldown
            session={session}
            onCooldownSkipPress={() => this.handleCooldownSkip()}
            onBuyProPressed={() => this.handleBuyPro()}
          />
          ): (
          subjects.fetching ? (
              <Loading />
            ):(
              <TabViewAnimated
                style={[styles.container, {paddingTop: 0}]}
                navigationState={{index: this.state.index, routes}}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
              />
            )
        )}
      </View>
    )
  }

  handleSubjectActionPress(subject_key, mode) {
    if(this.props.session.views < 5){
      ToastAndroid.show(`You need minimum 5 views to ${mode}`, ToastAndroid.SHORT)
    }else{
      this.props.fetchConcepts(subject_key, mode)
      tracker.trackEvent('Subject', mode)
    }
  }

  handleSubjectIndexPress(subject) {
    this.props.fetchIndex(subject)
    tracker.trackEvent('Subject', 'Index')
  }


  handleCooldownSkip() {

    if(this.props.coins.balance >= this.props.session.reset_cost ){
      this.props.skipCooldown()
      tracker.trackEvent('Session', 'Skip Cooldown')
    }else{
      Alert.alert('Not enough coins', 'You can buy 750 coins now for Rs.100/- only!', [
        {text: 'Yes!', onPress: () => NavigationActions.coins()},
        {text: 'No', onPress: () => tracker.trackEvent('Session', 'Dismissed coin buy alert')}
      ])
    }

  }

  handleBuyPro() {
    if(this.props.coins.balance >= this.props.session.pro_cost){
      // TODO Activate Pro

      Alert.alert('Not implemented yet')
      
    }else{
      Alert.alert('Not enough coins', 'You can buy 750 coins now for Rs.100/- only!', [
        {text: 'Yes!', onPress: () => NavigationActions.coins()},
        {text: 'No', onPress: () => tracker.trackEvent('Session', 'Dismissed coin buy alert')}
      ])
    }
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    coins: state.coins,
    subjects: state.subjects,
    index: state.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConcepts: (subject_key, mode) => {dispatch(ConceptActions.conceptRequest(subject_key, mode))},
    fetchIndex: (subject) => {dispatch(IndexActions.indexRequest(subject))},
    skipCooldown: () => dispatch(SessionActions.skipRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectScreen)
