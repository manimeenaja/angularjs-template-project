module.exports = {
  proxies: [
  {
    context: '/app',
    host: 'localhost',
    port: 7000,
    https: false
  }],
  paths: {
    reports: 'reports'
  }
};