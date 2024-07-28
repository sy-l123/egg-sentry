const Service = require('egg').Service;

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async request(url, opts) {
    url = `${this.root}${url}`;
    opts = Object.assign({
      timeout: [ '30s', '30s' ],
      dataType: 'json',
    }, opts);
    return this.ctx.curl(url, opts);
  }

  async create(params) {
    const result = await this.ctx.curl(`${this.root}/topics`, {
      method: 'POST',
      data: params,
      dataType: 'json',
      contentType: 'json',
    });
    this.checkSuccess(result);
    // 检查调用是否成功
    return result.data.topic_id;
  }

  async list(params) {
    const result = await this.request('/topics', {
      data: params,
    });

    this.checkSuccess(result);
    return result.data.data;
  }

  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : '请求失败';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = TopicService;
