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
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_SB,
  messagingSenderId: process.env.NEXT_PUBLIC_MS_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
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
