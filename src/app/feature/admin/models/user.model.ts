export interface IResponse<T> {
  message: string;
  error: boolean;
  status_code: number;
  results: T;
}

export interface IUsers {
  id?: number;
  firstname: string,
  lastname: string,
  email: string,
  user_name: string,
  is_password_changed: boolean,
  mobile_number: string,
  last_login: Date
}
