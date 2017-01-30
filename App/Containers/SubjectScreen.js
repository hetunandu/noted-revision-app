// @flow

import React from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import Loading from '../Components/Loading'
import SubjectTab from '../Components/SubjectTab'
import StatusBar from '../Components/StatusBar'
import { connect } from 'react-redux'
import SubjectActions from '../Redux/SubjectRedux'
import ConceptActions from '../Redux/ConceptRedux'
import IndexActions from '../Redux/IndexRedux'
import SessionActions from '../Redux/SessionRedux'
import Cooldown from '../Components/Cooldown'
import { Metrics, Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import styles from './Styles/SubjectScreenStyle'
import { tracker } from '../Lib/googleAnalytics'


class SubjectScreen extends React.Component {

  constructor(props){
    super(props)

  }

  componentDidMount(){

    tracker.trackScreenView('Subjects');

    this.props.fetchSubjectList()
  }

  render () {
    const { subjects, session, coins} = this.props

    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        <StatusBar coins={coins} session={session} />
        {session.views === 0 ? (
          <Cooldown
            session={session}
            onCooldownSkipPress={() => this.handleCooldownSkip()}
          />
          ): (
          subjects.fetching || subjects.list.length == 0 ? (
              <Loading />
            ):(
              <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor: Colors.snow}}
                tabBarBackgroundColor={Colors.notedBlue}
                tabBarActiveTextColor={Colors.snow}
                tabBarInactiveTextColor={Colors.notedBlueDarker}
              >
                {subjects.list.map(subject => {
                  return(
                    <SubjectTab
                      key={subject.key}
                      tabLabel={subject.name}
                      subject={subject}

                      onSubjectActionPress={(mode) => this.handleSubjectActionPress(subject.key, mode)}
                      onSubjectIndexPress={() => this.handleSubjectIndexPress(subject.key)}
                    />
                  )
                })}
              </ScrollableTabView>
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

  handleSubjectIndexPress(subject_key) {
    this.props.fetchIndex(subject_key)
    tracker.trackEvent('Subject', 'Index')
  }


  handleCooldownSkip() {
    // TODO: Alert to buy coins if not enough to skip
    this.props.skipCooldown()
    tracker.trackEvent('Session', 'Skip Cooldown')
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
    fetchSubjectList: () => {dispatch(SubjectActions.subjectRequest())},
    fetchConcepts: (subject_key, mode) => {dispatch(ConceptActions.conceptRequest(subject_key, mode))},
    fetchIndex: (subject_key) => {dispatch(IndexActions.indexRequest(subject_key))},
    skipCooldown: () => dispatch(SessionActions.skipRequest())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectScreen)
