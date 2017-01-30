// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  TextInput,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import Loading from '../Components/Loading'

// Styles
import styles from './Styles/SubscribeScreenStyle'


class SubscribeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      college: ''
    };
  }


  render () {

    const { user, fetching, error } = this.props.login

    return (
      <ScrollView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: user.picture_uri}}
                style={{width: 90, height: 90, borderRadius: 50}}
              />

              <Text style={{ fontSize: 20}}>
                Welcome {user.name}!
              </Text>
            </View>

            <Text style={{ fontSize: 25 }}>
              Fill in your college details
            </Text>

            <View>

              <Text style={styles.label}>
                Course:
              </Text>

              <TextInput
                style={{height: 40, width: 300}}
                value="HSC Commerce"
                editable={false}
              />
              <Text>We currently have support only for HSC Commerce</Text>
            </View>

            <View>
              <Text style={styles.label}>
                College name:
              </Text>

              <TextInput
                style={{height: 40, width: 300}}
                onChangeText={(text) => this.setState({college: text})}
                value={this.state.college}
              />
            </View>

            {fetching ? (
              <Loading />
              ): (
              <TouchableHighlight
                style={styles.submitBtn}
                onPress={() => this.submitDetails()}
              >
                <Text style={{fontSize: 25, color: 'white'}}>Start Studying!</Text>
              </TouchableHighlight>
            )}

            {error && <Text style={{color: 'red'}}>{error}</Text>}

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  submitDetails() {
    if(this.state.college.length < 2){
      ToastAndroid.show('That does not look like a college name', ToastAndroid.LONG);
    }else{
      this.props.subscribeCourse(this.state.college)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeCourse: (college) => dispatch(LoginActions.subscribeRequest(college))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeScreen)
