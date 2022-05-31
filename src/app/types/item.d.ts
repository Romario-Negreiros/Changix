export interface FormFields {
  name: string
  description: string
  category: string
  image0: FileList
  image1: FileList
  image2: FileList
  image3: FileList
  image4: FileList
  image5: FileList
}

export interface Item extends Pick<FormFields, 'name' | 'description' | 'category'> {
  id: string
  ownerId: string
  images: string[]
}

export enum CategoriesEnum {
  sports = 'sports',
  musicalInstruments = 'musicalInstruments'
}
