import { StartupTypes } from '../Redux/StartupRedux'
import Config from '../Config/DebugSettings'
import Immutable from 'seamless-immutable'
const Reactotron = require('reactotron-react-native').default
const errorPlugin = require('reactotron-react-native').trackGlobalErrors
const apisaucePlugin = require('reactotron-apisauce')
const { reactotronRedux } = require('reactotron-redux')
const sagaPlugin = require('reactotron-redux-saga')

if (Config.useReactotron) {
  Reactotron
    .configure({
      host: '10.0.3.2', // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: 'Noted - Revision App' // would you like to see your app's name?
    })

    // forward all errors to Reactotron
    .use(errorPlugin({
      // ignore all error frames from react-native (for example)
      veto: (frame) =>
        frame.fileName.indexOf('/node_modules/react-native/') >= 0
    }))

    // register apisauce so we can install a monitor later
    .use(apisaucePlugin())

    // setup the redux integration with Reactotron
    .use(reactotronRedux({
      // you can flag some of your actions as important by returning true here
      isActionImportant: action => action.type === StartupTypes.STARTUP,

      // you can flag to exclude certain types too... especially the chatty ones
      // except: ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'],

      // Fires when Reactotron uploads a new copy of the state tree.  Since our reducers are
      // immutable with `seamless-immutable`, we ensure we convert to that format.
      onRestore: state => Immutable(state)
    }))

    // register the redux-saga plugin so we can use the monitor in CreateStore.js
    .use(sagaPlugin())

    // let's connect!
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  }
}
