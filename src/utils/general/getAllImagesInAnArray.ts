import type { FormFields } from '@app/types/item'

const getAllImagesInAnArray = (data: FormFields, markUndefineds?: boolean) => {
  const images: (File | undefined)[] = []
  const propsWithImage = ['image0', 'image1', 'image2', 'image3', 'image4', 'image5']
  for (const prop in data) {
    if (propsWithImage.includes(prop)) {
      if (data[prop as keyof FormFields]?.length) {
        images.push(data[prop as keyof FormFields][0] as File)
      } else {
        if (markUndefineds) images.push(undefined)
      }
    }
  }
  return images
}

export default getAllImagesInAnArray
