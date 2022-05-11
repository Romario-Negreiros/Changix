import { CountryCode } from 'libphonenumber-js/types'

export interface Country {
  name: string;
  alpha2Code: CountryCode;
}

export interface FormFields {
  picture: FileList;
  email: string;
  name: string;
  pwd: string;
  confirmPwd: string;
  country: string;
  phoneNumber: string;
}

export interface UserProfile extends Omit<FormFields, 'email' | 'pwd' | 'confirmPwd'> {
}
