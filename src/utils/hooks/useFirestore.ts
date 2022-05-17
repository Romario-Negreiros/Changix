import firebase from '@app/lib/firebase'

import { joinPathSegmentsWithSlash } from '@utils/general'

import type { WhereArgs } from '@app/types/firestore'
import { CollectionReference, DocumentData, WithFieldValue } from 'firebase/firestore'

const useFirestore = () => {
  const { instance } = firebase.firestore

  const getCollection = (pathSegments: string[]) => {
    const path = joinPathSegmentsWithSlash(pathSegments)
    return firebase.firestore.collection(instance, path)
  }

  const getDocReference = (pathSegments: string[], docId: string) => {
    const path = joinPathSegmentsWithSlash(pathSegments)
    return firebase.firestore.doc(instance, path, docId)
  }

  const createQuery = (collection: CollectionReference<DocumentData>, whereArgs: WhereArgs) => {
    return firebase.firestore.query(collection, firebase.firestore.where(...whereArgs))
  }

  const getDocs = async (pathSegments: string[], whereArgs: WhereArgs) => {
    const collection = getCollection(pathSegments)
    const query = createQuery(collection, whereArgs)
    const results = await firebase.firestore.getDocs(query)
    return results
  }

  const getDoc = async (pathSegments: string[], docId: string) => {
    const doc = getDocReference(pathSegments, docId)
    const result = await firebase.firestore.getDoc(doc)
    return result
  }

  const setDoc = async (pathSegments: string[], docId: string, data: WithFieldValue<DocumentData>) => {
    const doc = getDocReference(pathSegments, docId)
    await firebase.firestore.setDoc(doc, data)
  }

  const updateDoc = async (pathSegments: string[], docId: string, data: WithFieldValue<DocumentData>) => {
    const doc = getDocReference(pathSegments, docId)
    await firebase.firestore.updateDoc(doc, data)
  }

  const deleteDoc = async (pathSegments: string[], docId: string) => {
    const doc = getDocReference(pathSegments, docId)
    await firebase.firestore.deleteDoc(doc)
  }

  return {
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc
  }
}

export default useFirestore
