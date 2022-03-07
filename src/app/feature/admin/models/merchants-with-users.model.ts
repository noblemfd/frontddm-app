import { IMerchantUsers } from "./merchant-users.model";
import { IUsers } from "./user.model";

export interface IResponse<T> {
  message: string;
  error: boolean;
  status_code: number;
  results: T;
}

export interface IMerchantsWithUsers {
  id?: number;
  merchant_name?: string;
  account_number?: string;
  user_name?: string;
  mobile_number?: string;
  merchant_status?: number;
  notification_required?: number;
  notification_url?: string;
  notification_credential?: string;
  charge_required?: number;
  charge_mode?: number;
  who_to_charge?: number;
  charge_percent?: number;
  charge_value?: number;
  min_charge_value?: number;
  max_charge_value?: number;
  created_date?: Date,
  user?: IUsers[],
  merchant_users?: IMerchantUsers[],
}
