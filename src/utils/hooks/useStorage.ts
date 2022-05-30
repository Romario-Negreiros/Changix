import firebase from '@app/lib/firebase'

import { joinPathSegmentsWithSlash } from '@utils/general'

const useStorage = () => {
  const { instance } = firebase.storage

  const getReference = (pathSegments: string[]) => {
    const path = joinPathSegmentsWithSlash(pathSegments)
    return firebase.storage.ref(instance, path)
  }

  const uploadImages = async (images: File[], pathSegments: string[]) => {
    const downloadUrls = []
    for (const img of images) {
      const ref = getReference([...pathSegments, String(images.indexOf(img))])
      await firebase.storage.uploadBytes(ref, img)
      const downloadUrl = await firebase.storage.getDownloadURL(ref)
      downloadUrls.push(downloadUrl)
    }
    return downloadUrls
  }

  const deleteImages = async (images: string[], pathSegments: string[]) => {
    for (const imgIndex in images) {
      const ref = getReference([...pathSegments, imgIndex])
      await firebase.storage.deleteObject(ref)
    }
  }

  return {
    uploadImages,
    deleteImages
  }
}

export default useStorage
