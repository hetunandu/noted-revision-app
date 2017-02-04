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
import LoginActions from '../Redux/LoginRedux'
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

  componentDidMount(){
    tracker.trackScreenView('Subjects');
  }

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => {
    return <TabBar
      {...props}
      scrollEnabled
      labelStyle={{padding: 0}}
      indicatorStyle={{backgroundColor: Colors.snow}}
      style={{backgroundColor: Colors.notedBlue}}
    />;
  };

  renderScene = ({ route }) => {

    const subject = route

    return (
      <SubjectTab
        subject={subject}
        pro={this.props.pro}

        onSingleConceptSelected={(concept_key) => this.handleSingleConceptSelection(concept_key) }
        onSubjectActionPress={(mode) => this.handleSubjectActionPress(subject.key, mode)}
        onSubjectIndexPress={() => this.handleSubjectIndexPress(subject)}
        onIndexDownload={() => this.handleIndexDownload(subject.key)}
      />
    )

  };



  render () {
    const { subjects, session, coins, pro} = this.props

    // Set title for all subject tabs
    const routes = subjects.list.map(subject => {
      let total = 0
      let read = 0

      subject.index.map(chapter => {
        chapter.concepts.map(concept => {
          total ++
          if(concept.read) read ++
        })
      })

      const complete = Math.round(read / total  * 100, 3)

      return Object.assign({}, subject, {
        title: `${subject.name} (${complete}%)`
      })
    })

    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        <StatusBar coins={coins} session={session} pro={pro} />
        {session.views <= 0 && !pro ? (
          <Cooldown
            session={session}
            onCooldownSkipPress={() => this.handleCooldownSkip()}
            onBuyProPressed={() => this.handleBuyPro()}
            onCooldownComplete={() => this.handleCoolDownComplete()}
          />
          ): (
          subjects.fetching ?(
              <Loading />
            ):(
              <TabViewAnimated
                style={[styles.container, {paddingTop: 0}]}
                navigationState={{index: this.state.index, routes}}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onRequestChangeTab={this.handleChangeTab}
              />
            )
        )}
      </View>
    )
  }

  handleSubjectActionPress(subject_key, mode) {
    this.props.fetchConcepts(subject_key, mode)
    tracker.trackEvent('Subject', mode)
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
      this.props.activatePro()
    }else{
      Alert.alert('Not enough coins', 'You can buy 750 coins now for Rs.100/- only!', [
        {text: 'Yes!', onPress: () => NavigationActions.coins()},
        {text: 'No', onPress: () => tracker.trackEvent('Session', 'Dismissed coin buy alert')}
      ])
    }
  }

  handleCoolDownComplete() {
    // TODO Refresh the session
  }

  handleIndexDownload(key) {
    this.props.indexDownload(key)
  }

  handleSingleConceptSelection(concept_key) {
    this.props.reviseSingleConcept(concept_key)
  }
}

const mapStateToProps = (state) => {
  return {
    pro: state.login.user.pro,
    session: state.session,
    coins: state.coins,
    subjects: state.subjects,
    concepts: state.concepts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reviseSingleConcept: (key) => dispatch(ConceptActions.singleRequest(key)),
    fetchConcepts: (subject_key, mode) => {dispatch(ConceptActions.conceptRequest(subject_key, mode))},
    fetchIndex: (subject) => {dispatch(IndexActions.indexRequest(subject))},
    skipCooldown: () => dispatch(SessionActions.skipRequest()),
    activatePro: () => dispatch(SessionActions.proRequest()),
    indexDownload: (key) => dispatch(IndexActions.downloadRequest(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectScreen)
