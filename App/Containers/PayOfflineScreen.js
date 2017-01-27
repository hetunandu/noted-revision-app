// @flow

import React from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/MaterialIcons'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Communications from 'react-native-communications'

// Styles
import styles from './Styles/PayOfflineScreenStyle'

// I18n
import I18n from 'react-native-i18n'

const reps = [
  {
    "name": "Pooja Jain",
    "college": "Jai Hind College",
    "area": "Charni Road",
    "number": "8811833803",
  },
  {
    "name": "Tarun Lohar",
    "college": "N. L. Dalmia",
    "area": "Mira Road",
    "number": "8828380743",
  },
  {
    "name": "Manisha Gerella",
    "college": "H.R. College",
    "area": "Ulhasnagar",
    "number": "8452063086",
  },
  {
    "name": "Bhavya Shah",
    "college": "M.K. Sanghvi College",
    "area": "Andheri",
    "number": "9898928798",
  },
  {
    "name": "Raj Gori",
    "college": "Somaiya College",
    "area": "Ghatkopar",
    "number": "9702378946",
  },
  {
    "name": "Nihar Agarwal",
    "college": "NMIMS",
    "area": "Vile Parle",
    "number": "7028637878",
  },
  {
    "name": "Yutika Giri",
    "college": "Mithibai College",
    "area": "Kandivali West",
    "number": "9820181796",
  },
  {
    "name": "Breneyl Vaz",
    "college": "St Andrew's College",
    "area": "Dahisar East",
    "number": "8291175308",
  },
  {
    "name": "Anshika Lakhmani",
    "college": "H.R College",
    "area": "Churchgate",
    "number": "9836873862",
  },
  {
    "name": "Sejal Seth",
    "college": "Xavier's College",
    "area": "Colaba",
    "number": "9987143175",
  },
  {
    "name": "Ishanika Sehgal",
    "college": "Sophia College",
    "area": "Cumballa Hill",
    "number": "8462001234",
  },
  {
    "name": "Saurabh Jain",
    "college": "N.L. College",
    "area": "Malad East",
    "number": "9769429715",
  },
  {
    "name": "Falguni Agarwal",
    "college": "Thakur College",
    "area": "Kandivali East",
    "number": "9534112193",
  },

]


class PayOfflineScreen extends React.Component {

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>
          You can buy coins from one of our representatives
          by paying in cash
        </Text>
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
          {reps.map((rep, i) => {
            return(
              <View key={i} style={styles.rep}>
                <View style={styles.repDetails}>
                  <Text style={styles.repName}>
                    {rep.name}
                  </Text>
                  <Text style={styles.repInfo}>
                    College: {rep.college}
                  </Text>
                  <Text style={styles.repInfo}>
                    Area: {rep.area}
                  </Text>
                </View>
                <View style={styles.repContact}>
                  <TouchableHighlight
                    underlayColor="#f1f1f1"
                    onPress={() => this.textRep(rep)}
                  >
                    <Icon name="textsms" size={30} color="gray" />
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="#f1f1f1"
                    onPress={() => this.callRep(rep.number)}
                  >
                    <Icon name="call" size={30} color="green" />
                  </TouchableHighlight>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  callRep(number){
    Communications.phonecall(number, true)
  }

  textRep(rep){
    Communications.text(rep.number, `Hey ${rep.name}! I want to buy Noted coins.`)
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayOfflineScreen)
