import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "lontra-e9224.firebaseapp.com",
  databaseURL: "https://lontra-e9224.firebaseio.com",
  projectId: "lontra-e9224",
  storageBucket: "lontra-e9224.appspot.com",
  messagingSenderId: "633968632718",
  appId: "1:633968632718:web:6cdebe871f3bbee2313adf",
  measurementId: "G-W95B5R0HX3"
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const restaurantsCollection = db.collection('restaurants')
const menusCollection = db.collection('menus')
const usersCollection = db.collection('users')

export default {
  db,
  auth,
  currentUser,
  restaurantsCollection,
  menusCollection,
  usersCollection
}