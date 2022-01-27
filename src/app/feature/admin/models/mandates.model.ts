import { IMandateDetails } from './mandate-details.model'
import { IMerchants } from './merchants.model'

export interface IResponse<T> {
  message: string;
  error: boolean;
  status_code: number;
  results: T;
}

export interface IMandate {
  ReferenceNumber: string;
  DrAccountNumber: string;
  StartDate: Date;
  EndDate: Date;
  PaymentFrequency: number;
  Amount: number;
}

export interface IMandates {
  reference_number: string;
  dr_account_number: string;
  start_date: Date;
  end_date: Date;
  payment_frequency: number;
  is_approved: number;
  amount: number;
  requested_by: string;
  approved_by: string;
  approved_date: Date;
  created_date: Date;
 // mandate_details?: IMandateDetails[];
 // merchants?: IMerchants[];
}

