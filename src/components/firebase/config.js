import app from 'firebase/app'
import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA06YfS4cDNliN8rbd4cVyPH_BZzTqe5WQ",
    authDomain: "reactnative-1c42d.firebaseapp.com",
    projectId: "reactnative-1c42d",
    storageBucket: "reactnative-1c42d.appspot.com",
    messagingSenderId: "998206278041",
    appId: "1:998206278041:web:933512362c84f40b1c2b08"
  };

app.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()
  