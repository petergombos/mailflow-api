const env = process.env.NODE_ENV || 'development'
const redisPort = process.env.REDIS_PORT || 6379
const redisHost = process.env.REDIS_HOST || 'localhost'

export default {
  APP_PORT: process.env.APP_PORT || env === 'test' ? 3001 : 3000,
  ENV: env,
  DB: `mongodb://${process.env.DB || 'localhost'}/mailflow-${env}`,
  REDIS: `redis://${redisHost}:${redisPort}`
}
