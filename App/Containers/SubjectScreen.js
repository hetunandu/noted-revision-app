// @flow

import React from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
import Loading from '../Components/Loading'
import SubjectTab from '../Components/SubjectTab'
import StatusBar from '../Components/StatusBar'
import { connect } from 'react-redux'
import SubjectActions from '../Redux/SubjectRedux'
import ConceptActions from '../Redux/ConceptRedux'
import IndexActions from '../Redux/IndexRedux'

import { Metrics, Colors } from '../Themes'
// external libs
import ScrollableTabView from 'react-native-scrollable-tab-view'

// Styles
import styles from './Styles/SubjectScreenStyle'

class SubjectScreen extends React.Component {

  constructor(props){
    super(props)

  }

  componentDidMount(){
    this.props.fetchSubjectList()
  }

  render () {
    const { subjects, user, index } = this.props

    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        <StatusBar coins={user.points} session={user.session} />
        {subjects.fetching || subjects.list.length == 0 ? (
          <Loading />
          ):(
            <ScrollableTabView
              tabBarUnderlineStyle={{backgroundColor: Colors.snow}}
              tabBarBackgroundColor={Colors.notedBlue}
              tabBarActiveTextColor={Colors.snow}
              tabBarInactiveTextColor={Colors.darkGrey}
            >
              {subjects.list.map(subject => {
                return(
                  <SubjectTab
                    key={subject.key}
                    tabLabel={subject.name}
                    subject={subject}
                    index={{data: index.data[subject.key], fetching: index.fetching}}


                    onSubjectActionPress={(mode) => this.handleSubjectActionPress(subject.key, mode)}
                    onSubjectIndexPress={() => this.handleSubjectIndexPress(subject.key)}
                    onSingleConceptPress={(concept_key) => this.handleSingleConceptPress(subject.key, concept_key)}
                  />
                )
              })}
            </ScrollableTabView>
          )}
      </View>

    )
  }

  handleSubjectActionPress(subject_key, mode) {
    this.props.fetchConcepts(subject_key, mode)
  }

  handleSubjectIndexPress(subject_key) {
    this.props.fetchIndex(subject_key)
  }

  handleSingleConceptPress(subject_key, concept_key) {
    this.props.fetchSingleConcept(subject_key, concept_key)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    subjects: state.subjects,
    index: state.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubjectList: () => {dispatch(SubjectActions.subjectRequest())},
    fetchConcepts: (subject_key, mode) => {dispatch(ConceptActions.conceptRequest(subject_key, mode))},
    fetchIndex: (subject_key) => {dispatch(IndexActions.indexRequest(subject_key))},
    fetchSingleConcept: (subject_key, concept_key) =>
      dispatch(ConceptActions.singleRequest(subject_key, concept_key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectScreen)
