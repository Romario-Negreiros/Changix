export interface FormFields {
  name: string
  description: string
  category: string
  images: Filelist
}

export interface Item extends Omit<FormFields, 'images'> {
  id: string
  ownerId: string
  images: string[]
}

export enum CategoriesEnum {
  sports = 'sports',
  musicalInstruments = 'musicalInstruments'
}
