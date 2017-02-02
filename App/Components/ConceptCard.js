// @flow

import React from 'react'
import { View, Text, ScrollView, TouchableHighlight, Alert, ToastAndroid} from 'react-native'
import Explanation from './Explanation'
import Reference from './Reference'
import styles from './Styles/ConceptCardStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Metrics} from '../Themes'
import * as Animatable from 'react-native-animatable';
import tts from 'react-native-android-speech'

export default class ConceptCard extends React.Component {


  componentDidUpdate() {
    // if(this.props.isSpeaking){
    //   tts.isSpeaking()
    //     .then(isSpeaking => {
    //       //Callback
    //       if(!isSpeaking){
    //         this.props.toggleSpeak()
    //       }
    //     })
    //     .catch(error => {
    //       //if it fails
    //       console.tron.log(error)
    //     });
    // }
  }

  renderActions() {
    if (this.props.mode == 'revise' && !this.props.showRef && !this.props.isSpeaking ){
      return (
        <View style={styles.actions}>
          <TouchableHighlight
            style={styles.actionBtn}
            underlayColor="#444"
            onPress={() => this.handleToggleRef()}
          >
            <Icon name="info" size={35} color="white" />
          </TouchableHighlight>
          {this.props.concept.important ? (
              <Icon name="star" size={35} color="gold" />
            ): (
              <TouchableHighlight
                style={styles.actionBtn}
                underlayColor="#444"
                onPress={() => this.handleStarConcept()}
              >
                <Icon name="star-border" size={35} color="white" />
              </TouchableHighlight>
          )}
          <TouchableHighlight
            underlayColor="#444"
            style={styles.actionBtn}
            onPress={() => this.toggleSpeakAloud()}
          >
            <Icon name="volume-up" size={35} color="white" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#444"
            style={styles.actionBtn}
            onPress={() => this.handleSkipConcept()}
          >
            <Icon name="skip-next" size={35} color="white" />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#444"
            style={styles.actionBtn}
            onPress={() => this.handleReadConcept()}
          >
            <Icon name="done" size={35} color="white" />
          </TouchableHighlight>
        </View>
      )
    }else if(this.props.showRef){
      return(
        <View style={styles.actions}>
          <TouchableHighlight
            underlayColor="#444"
            style={styles.actionBtn}
            onPress={() => this.handleToggleRef()}
          >
            <Icon name="short-text" size={35} color="white" />
          </TouchableHighlight>
        </View>
      )
    }else if(this.props.isSpeaking){
      return(
        <View style={styles.actions}>
          <TouchableHighlight
            underlayColor="#444"
            style={styles.actionBtn}
            onPress={() => this.toggleSpeakAloud()}
          >
            <Icon name="stop" size={35} color="white" />
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
      <Animatable.View animation="slideInLeft" style={styles.container} direction="alternate" duration={400} ref="card">
        { this.renderContents() }
        { this.renderActions() }
      </Animatable.View>
    )
  }


  handleToggleRef() {
    this.refs.card.flipInY(300)
    this.props.toggleRef()
  }


  handleReadConcept() {
    this.refs.card.slideOutUp(400)
      .then((endState) => {
        this.props.markConcept(this.props.concept.key, 'read')
      })
  }


  handleStarConcept() {
    this.props.starConcept(this.props.concept.key)
  }

  handleSkipConcept() {
    this.refs.card.zoomOut(400)
      .then((endState) => {
        this.props.markConcept(this.props.concept.key, 'skip')
      })
  }

  toggleSpeakAloud() {
    if(this.props.isSpeaking){
      this.props.toggleSpeak()
    }else{
      this.props.toggleSpeak()
      this.readAloudConcept()
    }
  }

  readAloudConcept() {

    tts.getLocales().then(locales=>{
      if(!locales){
        Alert.alert('Text to speech not supported on this device')
      }else{
        ToastAndroid.show("Starting text to speech. Please wait....", ToastAndroid.SHORT)
      }
    });


    const explanation = this.props.concept.explanation
    let textToSpeak = '';
    explanation.map((node, i) => {
      switch (node.type) {
        case 'title':
          textToSpeak = textToSpeak.concat(node.data, '.');
          break;
        case 'text':
          textToSpeak = textToSpeak.concat(node.data, '.');
          break;
        case 'image':
          break;
        case 'quote':
          textToSpeak = textToSpeak.concat(node.data, '.');
          break;
        case 'pointers':
          node.data.map((point, i) => {
            textToSpeak = textToSpeak.concat(`Point ${i + 1}. ${point.title}`, '.');
            point.nodes.map((node) => {
              switch (node.type) {
                case 'text':
                  textToSpeak = textToSpeak.concat(node.data, '.');
                  break;
                case 'subPoint':
                  node.data.map((subPoint) => textToSpeak = textToSpeak.concat(subPoint, '.'))
                  break;
                case 'image':
                  break;
                default:
                  textToSpeak = textToSpeak.concat('unknown node type. cant speak');
              }
            });
          });
          break;
        default:
          textToSpeak = textToSpeak.concat('unknown explanation type. cant speak');
      }
    })

    textToSpeak = textToSpeak.concat('. End of concept');

    textToSpeak = textToSpeak.replace(/\*/g, '');

    tts.speak({
      text: textToSpeak,
      pitch: 0.8,
      forceStop : !this.props.isSpeaking,
    }).then(isSpeaking=>{
      //Success Callback
      ToastAndroid.show("Speaking", ToastAndroid.SHORT)
    }).catch(error=>{
      //Error Callback
      console.tron.log(error)
      Alert.alert('Error', error)
      this.props.toggleSpeak()
    });

  }
}

// Prop type warnings
ConceptCard.propTypes = {
  concept: React.PropTypes.object.isRequired,
  mode: React.PropTypes.string,
  showRef: React.PropTypes.bool,
  isSpeaking: React.PropTypes.bool,
  toggleRef: React.PropTypes.func,
  markConcept: React.PropTypes.func,
  starConcept: React.PropTypes.func,
  toggleSpeak: React.PropTypes.func
}
// Defaults for props
ConceptCard.defaultProps = {
  mode: 'revise'
}
