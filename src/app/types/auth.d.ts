export interface Country {
  name: string;
  alpha2Code: string; // cca2
  callingCode: string; // ccn3
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

export interface User extends Omit<FormFields, 'confirmPwd'> {
}
