
const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export class Util {
  /**
   * 获取验证码
   */
  static getCode() {
    let str = '';
    // 验证码有几位就循环几次
    for (let i = 0; i < 4; i++) {
      let ran = this.getRandom(0, 62);
      str += codeStr.charAt(ran);
    }
    return str;
  }
  // 用来生成随机整数
  static getRandom(n, m) { // param: (Number, Number)
    n = Number(n);
    m = Number(m);
    // 确保 m 始终大于 n
    if (n > m) {
      let temp = n;
      n = m;
      m = temp;
    }
    // 下有详细说明
    return Math.floor(Math.random() * (m - n) + n);
  }

}