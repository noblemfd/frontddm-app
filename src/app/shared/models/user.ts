export interface IResponse<T> {
  message: string;
  error: boolean;
  status_code: number;
  results: T;
}

export interface IUsers {
  users: IUser;
}

export interface IUser {
  user_name?: string;
  is_password_changed?: boolean;
  last_login?: Date;
  token?: string;
  roles?: string[];
  expires?: Date;
}

