/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1718351192714_6602';

  config.jwt = {
    secret: 'jwt123465', // 自定义token的加密条件字符串，可按各自的需求填写
  };

  // Mysql
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg_sentry',
    username: 'root',
    password: '',
    // 中国时区
    timezone:  '+08:00',
    define: {
      //freezeTableName默认值为false，会自动在表名后加s
      freezeTableName: true,
      // timestamps默认值为true，会自动添加create_time和update_time
      timestamp: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    }
  };

  // csrf 安全配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    // 允许访问接口的白名单
    domainWhiteList: ['*'] // ['http://localhost:8080']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH'
  };

  // add your middleware config here
  config.middleware = [
    'errorHandler',
  ];

  config.errorHandler = {
    match: '/api',
  };

  // add your user config here
  const userConfig = {
    myAppName: 'egg',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    pageSize: 10,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  return {
    ...config,
    ...userConfig,
  };
};
