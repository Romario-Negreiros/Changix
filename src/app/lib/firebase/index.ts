import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  deleteUser
} from 'firebase/auth'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_MS_ID,
  appId: process.env.REACT_APP_APP_ID
}

const app = initializeApp(firebaseConfig)

const firebase = {
  auth: {
    ...getAuth(app),
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updatePassword,
    deleteUser
  }
}

export default firebase
