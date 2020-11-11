export default {
  driver: 'redis',
  config: {
    redis: {
      host: 'redis',
      port: 6379,
      password: process.env.REDIS_PASSWORD,
    },
  },
};
