const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit) || 10,
      offset: ctx.helper.parseInt(ctx.query.offset) || 0,
    };
    console.log('index query>>>', query);
    const result = await ctx.service.users.list(query);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

  async create() {
    const { ctx } = this;
    const result = await ctx.service.users.create(ctx.request.body);
    const json = ctx.helper.json(result,  result ? '用户创建成功' : '用户创建失败', result ? 201 : 404);
    ctx.body = json;
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await ctx.service.users.find(id);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const updates = ctx.request.body;
    const result = await ctx.service.users.update(id, updates);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.users.del(id);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }
}

module.exports = UserController;