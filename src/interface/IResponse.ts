export interface IResponse<T> {
  code: number
  data: T
  msg?: string
}