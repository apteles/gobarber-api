export default {
  API_URL: process.env.APP_API_URL,
  WEB_URL: process.env.APP_WEB_URL,
  storage: {
    driver: 'local',
    bucket: 'gobarber-app-storage',
  },
};
