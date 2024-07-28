const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async index() {
    const { ctx } = this;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit) || 10,
      offset: ctx.helper.parseInt(ctx.query.offset) || 0,
    };
    console.log('index query>>>', query);
    const result = await ctx.service.project.list(query);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

  async show() {
    const { ctx } = this;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>222', ctx.query);
    const rules = {
      appid: {
        type: 'string',
        trim: true,
        required: true,
        max: 255,
      },
      eventType: {
        type: 'string',
        trim: true,
        required: false,
        max: 50,
      }
    }
    ctx.validate(rules, ctx.query);
    const result = await ctx.service.project.findAll(ctx.query);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

}

module.exports = ProjectController;