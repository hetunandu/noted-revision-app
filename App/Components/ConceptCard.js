// @flow

import React from 'react'
import { View, Text, ScrollView, Animated, TouchableHighlight, Easing } from 'react-native'
import Explanation from './Explanation'
import Reference from './Reference'
import styles from './Styles/ConceptCardStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Metrics} from '../Themes'

export default class ConceptCard extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      scale: new Animated.Value(0),
      translateX: new Animated.Value(0)
    }
  }

  componentDidMount(){
    this.animateCardIn()
  }

  render () {
    return (
      <Animated.View style={[
        styles.container,
        {
          transform: [
            { scale: this.state.scale },
            { translateX: this.state.translateX }
          ]
        }
        ]}
      >
        { this.renderContents() }
        <View style={styles.actions}>
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={() => this.handleToggleRef()}
          >
            <Icon name="info" size={35} color="grey" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={() => this.handleReadConcept()}
          >
            <Icon name="done" size={35} color="green" />
          </TouchableHighlight>
        </View>
      </Animated.View>
    )
  }

  animateCardIn() {
    Animated.spring(
      this.state.scale,
      {toValue: 1, friction: 7}
    ).start();
  }


  handleToggleRef() {
    this.props.toggleRef()
  }

  renderContents() {
    if(this.props.mode === 'revise'){
      if(this.props.showRef){
        return (
          <Reference
            conceptName={this.props.concept.name}
            references={this.props.concept.references}
          />
        )
      }else{
        return <Explanation explanation={this.props.concept.explanation} />
      }
    }
  }

  handleReadConcept() {
    // Animated.timing(
    //   this.state.translateX,
    //   {
    //     toValue: Metrics.screenWidth,
    //     easing: Easing.inOut,
    //     duration: 200
    //   }
    // ).start()
    this.props.markConcept(this.props.concept.key, 'read')
  }


}

// Prop type warnings
ConceptCard.propTypes = {
  concept: React.PropTypes.object.isRequired,
  mode: React.PropTypes.string,
  showRef: React.PropTypes.bool,
  toggleRef: React.PropTypes.func,
  markConcept: React.PropTypes.func
}
// Defaults for props
ConceptCard.defaultProps = {
  mode: 'revise'
}
