const Controller = require('egg').Controller;

class MetaDataController extends Controller {
  async index() {
    const { ctx } = this;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit) || 10,
      offset: ctx.helper.parseInt(ctx.query.offset) || 0,
    };
    console.log('index query>>>', query);
    const result = await ctx.service.metaData.list(query);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

  async create() {
    const { ctx } = this;
    const metaRules = {
      uuid: {
        type: 'string',
        trim: true,
        required: true,
        max: 255,
      },
      version: {
        type: 'string',
        trim: true,
        required: false,
        max: 255,
      },
      os: {
        type: 'string',
        trim: true,
        required: false,
        max: 255,
      },
      sdk_version: {
        type: 'string',
        trim: true,
        required: false,
        max: 255,
      },
      language: {
        type: 'string',
        trim: true,
        required: false,
        example: '',
        max: 255,
      },
      explore: {
        type: 'string',
        trim: true,
        required: false,
        max: 255,
      },
      terminal: {
        type: 'string',
        trim: true,
        required: false,
        max: 255,
      },
      event_type: {
        type: 'string',
        trim: true,
        required: true,
        max: 255,
      },
      event_name: {
        type: 'string',
        trim: true,
        required: true,
        max: 255,
      },
      app_id: {
        type: 'string',
        required: true,
      },
      env: {
        type: 'string',
        trim: true,
        required: false,
        max: 255,
      },
      path: {
        type: 'string',
        trim: true,
        required: false,
      }
    };
    const timingRules = {
      timingid: {
        type: 'string',
        trim: true,
        required: true,
        max: 60,
      },
      connect: {
        type: 'number',
        trim: true,
        required: false,
      },
      ttfb: {
        type: 'number',
        trim: true,
        required: false,
      },
      response: {
        type: 'number',
        trim: true,
        required: false,
      },
      parse: {
        type: 'number',
        trim: true,
        required: false,
      },
      load: {
        type: 'number',
        trim: true,
        required: false,
      },
      resource: {
        type: 'number',
        trim: true,
        required: false,
      },
      tti: {
        type: 'number',
        trim: true,
        required: false,
      },
      first_screen: {
        type: 'number',
        trim: true,
        required: false,
      },
      fcp: {
        type: 'number',
        trim: true,
        required: false,
      },
    };
    const lcpRules = {
      lcpid: {
        type: 'string',
        trim: true,
        required: true,
        max: 60,
      },
      renderTime: {
        type: 'number',
        trim: true,
        required: true,
      },
      nodeName: {
        type: 'string',
        trim: true,
        required: true,
        max: 255,
      },
      outerHTML: {
        type: 'string',
        trim: true,
        required: false,
        max: 255,
      },
      nodeId: {
        type: 'string',
        trim: true,
        required: false,
        max: 60,
      }
    };
    const bodyRule = {
      type: 'array',
      required: true,
    };
    ctx.validate(bodyRule, ctx.request.body);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>222', ctx.request.body);
    if (!Array.isArray(ctx.request.body)) {
      const json = ctx.helper.json(null, '参数错误', 400);
      ctx.body = json;
      return;
    }
    const tasks = [];
    ctx.request.body.forEach(item => {
      const meta = item.meta;
      let paramRules;
      if (meta.event_type === 'web_performance_timing') {
        paramRules = timingRules;
      } else if (meta.event_type === 'web_performance_lcp') {
        paramRules = lcpRules;
      }
      const params = item.params;
      ctx.validate(metaRules, meta);
      ctx.validate(paramRules, params);
      console.log('item验证成功>>>>>>>>>>>>>>>>>>>>>>>>', item);
      tasks.push(ctx.service.metaData.create(meta, params));
    });
    const result = await Promise.allSettled(tasks);
    // const result = await ctx.service.metaData.create(meta, params);
    console.log('result>>>>>>>>>>>>>>>>>>>>>>>>', result);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

  validateItem(ctx, rules, item) {
    // 对单个item进行验证的逻辑封装
    try {
      ctx.validate(rules, item);
    } catch (error) {
      // 处理验证失败的情况，例如记录日志、返回错误信息等
      console.error('Validation Error:', error);
      // 这里可以根据实际需求返回错误信息或者进行其他错误处理
      // 此处只是示例，实际应用中可能需要更复杂的错误处理逻辑
      return { success: false, message: 'Validation failed for an item.' };
    }
    return { success: true };
  }

  async show() {
    const { ctx } = this;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>222', ctx.params.id);
    const result = await ctx.service.metaData.findOne(ctx.params.id);
    const json = ctx.helper.json(result);
    ctx.body = json;
  }

}

module.exports = MetaDataController;