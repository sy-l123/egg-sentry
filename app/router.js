/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  app.redirect('/', '/news');
  router.get('/news', controller.news.list);
  // 通过 router.resources 方法，将 topics 这个资源的增删查改接口映射到了 controller/topics.js 文件
  router.resources('topics', '/api/v1/topics', controller.topics);

    // router.post('/login', controller.user.login);
  /**
   * 用户
   */
  router.resources('users', '/api/v1/users', controller.users);
  router.resources('metadata', '/api/v1/metadata', controller.metaData);
  /**
   * 项目&指标
   */
  router.get('/api/v1/projectMetric', controller.project.show);
  /**
   * 项目
   */
  router.resources('project', '/api/v1/project', controller.project);
};
