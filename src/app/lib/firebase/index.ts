import { initializeApp } from 'firebase/app'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  deleteUser,
  sendEmailVerification,
  applyActionCode,
  sendPasswordResetEmail,
  confirmPasswordReset,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  limit
} from 'firebase/firestore'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'

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
    instance: getAuth(app),
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updatePassword,
    deleteUser,
    sendEmailVerification,
    applyActionCode,
    sendPasswordResetEmail,
    confirmPasswordReset,
    reauthenticateWithCredential,
    EmailAuthProvider
  },

  firestore: {
    instance: getFirestore(app),
    collection,
    query,
    where,
    getDocs,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    limit
  },

  storage: {
    instance: getStorage(app),
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
  }
}

export default firebase
