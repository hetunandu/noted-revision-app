// @flow

import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './Styles/SubjectTabStyle'
// import SubjectActionButton from '../Components/SubjectActionButton'
// import StatusCounter from '../Components/StatusCounter'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Index from '../Components/Index'


export default class SubjectTab extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Index
          index={this.props.subject.index}
          onConceptSelected={(concept_key) => this.handleConceptSelected(concept_key)}
          onConceptStar={(concept_key) => this.handleConceptStar(concept_key)}
        />
        <TouchableHighlight
          style={styles.FAB}
          underlayColor={Colors.notedRedDarker}
          onPress={() => this.handleRevision()}
        >
          <Icon name="play-arrow" size={30} color="#fff"/>
        </TouchableHighlight>
      </View>
    )
  }



  handleRevision(){
    this.props.onSubjectActionPress('revise')
  }

  handleTest(){
    this.props.onSubjectActionPress('test')
  }

  handleIndex(){
    this.props.onSubjectIndexPress()
  }

  handleConceptSelected(concept_key) {
    this.props.onSingleConceptSelected(concept_key)
  }

  handleConceptStar(concept_key){
    this.props.onConceptStar(concept_key)
  }

  handleDownloadPress() {
    this.props.onIndexDownload()
  }
}

// Prop type warnings
SubjectTab.propTypes = {
  subject: React.PropTypes.shape({
    name: React.PropTypes.string,
    key: React.PropTypes.string,
    index: React.PropTypes.array
  }),
  concept_data: React.PropTypes.object,
  pro: React.PropTypes.bool,
  onSingleConceptSelected: React.PropTypes.func,
  onConceptStar: React.PropTypes.func,
  onSubjectActionPress: React.PropTypes.func,
  onSubjectIndexPress: React.PropTypes.func,
  onIndexDownload: React.PropTypes.func,
  index: React.PropTypes.array,
}
//
// // Defaults for props
// SubjectTab.defaultProps = {
//   someSetting: false
// }
