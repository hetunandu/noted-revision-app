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

  renderActions() {
    if (this.props.mode == 'revise'){
      return (
        <View style={styles.actions}>
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={() => this.handleToggleRef()}
          >
            <Icon name="info" size={35} color="grey" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={() => this.handleStarConcept()}
          >
            <Icon name="star-border" size={35} color="grey" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={() => this.handleSpeakAloud()}
          >
            <Icon name="volume-up" size={35} color="grey" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={() => this.handleSkipConcept()}
          >
            <Icon name="skip-next" size={35} color="grey" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={() => this.handleReadConcept()}
          >
            <Icon name="done" size={35} color="green" />
          </TouchableHighlight>
        </View>
      )
    }
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

        { this.renderActions() }
      </Animated.View>
    )
  }

  animateCardIn() {
    this.state.translateX.setValue(Metrics.screenWidth)

    Animated.spring(
      this.state.translateX,
      {toValue: 0, friction: 7}
    ).start();
  }


  handleToggleRef() {
    this.props.toggleRef()
  }


  handleReadConcept() {
    this.props.markConcept(this.props.concept.key, 'read')
  }


  handleStarConcept() {

  }

  handleSpeakAloud() {

  }

  handleSkipConcept() {
    this.props.markConcept(this.props.concept.key, 'skip')
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
