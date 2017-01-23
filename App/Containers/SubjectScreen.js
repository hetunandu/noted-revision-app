// @flow

import React from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
import Loading from '../Components/Loading';
import SubjectTab from '../Components/SubjectTab'
import StatusBar from '../Components/StatusBar';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SubjectActions from '../Redux/SubjectRedux'
import { Metrics, Colors } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
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
    const { subjects, user } = this.props

    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        <StatusBar coins={user.points} />
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
                  <SubjectTab key={subject.key} tabLabel={subject.name} subject={subject} />
                )
              })}
            </ScrollableTabView>
          )}
      </View>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    subjects: state.subjects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubjectList: () => {dispatch(SubjectActions.subjectRequest())},
    changeIndex: (index) => {dispatch(SubjectActions.changeSubjectIndex(index))}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectScreen)
