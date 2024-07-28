const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  title: 'string',
  content: 'string',
  accesstoken: 'string',
  tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
};

class TopicController extends Controller {
  async create() {
    const { ctx } = this;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
    // 校验 ctx.request.body 是否符合我们的预期
    ctx.validate(createRule, ctx.request.body);
    // 用验证过的参数调用service封装的业务逻辑来创建一个topic
    const id = await ctx.service.topics.create(ctx.request.body);
    // 按照接口约定的格式设置相应状态和内容
    ctx.body = {
      topic_id: id,
    };
    ctx.status = 201;
  }

  async index() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'string', format: /\d+/, required: false },
      tab: { type: 'enum', values: [ 'ask', 'share', 'job', 'good' ], required: false },
      limit: { type: 'string', format: /\d+/, required: false },
    }, ctx.query);

    // 处理GET请求
    ctx.body = await ctx.service.topics.list({
      page: ctx.query.page,
      tab: ctx.query.tab,
      limit: ctx.query.limit,
      mdrender: ctx.query.mdrender !== 'false',
    });
  }

}

module.exports = TopicController;
