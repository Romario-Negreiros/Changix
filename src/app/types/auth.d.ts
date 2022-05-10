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
