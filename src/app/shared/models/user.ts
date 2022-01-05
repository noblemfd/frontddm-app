export interface IResponse<T> {
  message: string;
  error: boolean;
  code: number;
  results: T;
}

export interface IUser {
  user_name?: string;
  is_password_changed?: boolean;
  last_login?: Date;
  token?: string;
  roles?: string[];
  expires?: Date;
}
