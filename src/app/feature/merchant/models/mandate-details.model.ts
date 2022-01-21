export interface IResponse<T> {
  message: string;
  error: boolean;
  status_code: number;
  results: T;
}

export interface IMandateDetails {
  merchant_id: number;
  mandate_id: number;
  reference_number: string;
  serial_number: number;
  dr_account_number: string;
  due_date: Date;
  mandate_status: number;
  payable_amount: number;
  processed_date: Date;
}
