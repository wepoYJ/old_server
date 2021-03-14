export const EmailConf = {
  host: 'wepo_official@163.com',
  pwd: 'Ivent.fun1',
  SMTP_Auth: `BIVMDRJJLGUKZCDJ`,
}

console.log(`[Conf] EmailConf: ${EmailConf.host} ${EmailConf.pwd}`)

export const DBConf = {
  mongodb: 'localhost:27017/wepo',
  redis: {
    port: 6379,
    host: 'localhost',
    password: 'Ivent.fun1',
  }
}