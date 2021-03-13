export class Cache {
  static getValidateCodeKey(email: string) {
    return `${email}:code`
  }
  static getTokenKey(email: string) {
    return `${email}:token`
  }
}