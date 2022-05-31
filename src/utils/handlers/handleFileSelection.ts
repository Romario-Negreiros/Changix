const handleFileSelection = (
  event: React.FormEvent<HTMLInputElement>,
  setImgPreview?: (imgPreview: string) => void,
  index?: number,
  setImagesPreviews?: (callback: (oldImagesPreviews: any) => void) => void
) => {
  if (event.currentTarget) {
    const input = event.currentTarget
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      if (setImgPreview) setImgPreview(reader.result as string)
      if (setImagesPreviews && index !== undefined) {
        setImagesPreviews(oldImagesPreviews => {
          return {
            ...oldImagesPreviews,
            [`image${index}`]: reader.result as string
          }
        })
      }
    })

    if (input.files) {
      reader.readAsDataURL(input.files[0])
    }
  }
}

export default handleFileSelection
