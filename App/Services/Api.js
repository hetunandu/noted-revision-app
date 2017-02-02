// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://4-dot-noted-api.appspot.com/study') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json'
    },
    // 15 second timeout...
    timeout: 15000
  })

  // const token = AsyncStorage.getItem('login_token', (token) => {
  //   api.setHeader('Authorization', token)
  // })

  // Force OpenWeather API Key on all requests
  //api.addRequestTransform((request) => {
  //  request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  //})

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const loginUser = (accessToken) => api.post('login', {id_token: accessToken})

  const checkToken = (token) => api.get('user', {}, { headers: {'Authorization': token}})

  const subscribeCourse = (token, course, college) =>
    api.post(`courses/${course}/subscribe`, {college}, {headers: {'Authorization': token}})

  const getSubjects = (token) =>  api.get('subjects', {}, {headers: {'Authorization': token}})

  const getConcepts = (token, subject_key, mode) =>
    api.get(`subjects/${subject_key}/${mode}`, {}, {headers: {'Authorization': token}})

  const getSingleConcept = (token, concept_key) =>
    api.get(`concepts/${concept_key}`, {}, { headers: { 'Authorization': token } })

  const submitResult = (token, subject_key, mode, result) =>
    api.post(`subjects/${subject_key}/${mode}/result`, {result}, {headers: {'Authorization': token}})

  const getIndex = (token, subject_key) =>
    api.get(`subjects/${subject_key}/index`, {}, { headers: { 'Authorization': token } })

  const skipCooldown = (token) => api.get('session/reset', {}, {headers: { 'Authorization': token }})

  const redeemCode = (token, code) => api.post('users/code/redeem', {code}, {headers: {'Authorization': token}})

  const requestPayment = (token) => api.get('payments/request', {}, {headers: {'Authorization': token}})

  const paymentStatus = (token, key) => api.get(`payments/status/${key}`, {}, { headers: {'Authorization': token} })

  const starConcept = (token, concept_key) =>
    api.get(`concepts/${concept_key}/important`, {}, { headers: {'Authorization': token} })

  const activatePro = (token, device) => api.post('/users/pro', { device }, { headers: {'Authorization': token} })

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    loginUser,
    checkToken,
    subscribeCourse,
    getSubjects,
    getConcepts,
    getSingleConcept,
    submitResult,
    getIndex,
    skipCooldown,
    redeemCode,
    requestPayment,
    paymentStatus,
    starConcept,
    activatePro
  }
}

// let's return back our create method as the default.
export default {
  create
}
