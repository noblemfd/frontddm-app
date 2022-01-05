export interface IResponse<T> {
  message: string;
  error: boolean;
  code: number;
  results: T;
}
