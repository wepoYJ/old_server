export interface IResponse<T> {
  code: number
  data: T
  msg?: string
}
export interface INullResponse {
  code: number
  msg?: string
}