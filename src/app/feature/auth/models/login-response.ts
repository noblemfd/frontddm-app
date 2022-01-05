export interface IResponse<T> {
  message: string;
  error: boolean;
  code: number; // status_code
  results: T;
}

export interface ILoginResponse {
  token: string;
  users: [];
  roles: [];
  expires: any;
}

export interface IUsers {
  users: IUser[];
}

export interface IUser {
  id: number;
  user_name: string;
  mobile_number: string;
  last_login: Date;
}

export interface IRoles {
  roles: IRole[];
}

export interface IRole {
  id: number;
  name: string;
}


export interface ILoginResponses {
  loginresponses: ILoginResponse[];
}
