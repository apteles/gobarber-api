type StorageDriver = 'local' | 's3';

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '1d',
  storage: {
    driver: 's3' as StorageDriver,
  },
};
