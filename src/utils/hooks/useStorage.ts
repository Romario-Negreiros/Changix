import firebase from '@app/lib/firebase'

import { joinPathSegmentsWithSlash } from '@utils/general'

const useStorage = () => {
  const { instance } = firebase.storage

  const getReference = (pathSegments: string[]) => {
    const path = joinPathSegmentsWithSlash(pathSegments)
    return firebase.storage.ref(instance, path)
  }

  const uploadImages = async (
    images: (File | undefined)[],
    pathSegments: string[],
    markUndefineds?: boolean
  ) => {
    const downloadUrls = []
    for (const img of images) {
      if (img) {
        const ref = getReference([...pathSegments, String(images.indexOf(img))])
        await firebase.storage.uploadBytes(ref, img)
        const downloadUrl = await firebase.storage.getDownloadURL(ref)
        downloadUrls.push(downloadUrl)
      } else {
        if (markUndefineds) downloadUrls.push(undefined)
      }
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
