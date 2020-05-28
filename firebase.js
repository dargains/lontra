import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "covidf6.firebaseapp.com",
  databaseURL: "https://covidf6.firebaseio.com",
  projectId: "covidf6",
  storageBucket: "covidf6.appspot.com",
  messagingSenderId: "23428442938",
  appId: "1:23428442938:web:76ab2a3622477d392b3e03",
  measurementId: "G-F7BMF76STX"
};
!firebase.apps.length ? firebase.initializeApp(config) : '';

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const companiesCollection = db.collection('companies')
const usersCollection = db.collection('users')

export default {
  db,
  auth,
  currentUser,
  companiesCollection,
  usersCollection
}