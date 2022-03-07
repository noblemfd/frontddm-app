import { IMerchants } from "./merchants.model";
import { IUsers } from "./user.model";

export interface IResponse<T> {
  message: string;
  error: boolean;
  status_code: number;
  results: T;
}

export interface IMerchantUsers {
  id?: number;
  is_merchant_admin?: boolean,
  user?: IUsers[],
  merchant?: IMerchants[],
}
