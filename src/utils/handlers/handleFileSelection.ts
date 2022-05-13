const handleFileSelection = (
  event: React.FormEvent<HTMLInputElement>,
  setImgPreview: (imgPreview: string) => void
) => {
  if (event.currentTarget) {
    const input = event.currentTarget
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setImgPreview(reader.result as string)
    })

    if (input.files) {
      reader.readAsDataURL(input.files[0])
    }
  }
}

export default handleFileSelection
