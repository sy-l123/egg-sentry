const Service = require('egg').Service;

class MetaData extends Service {
  async list({ offset = 0, limit = 10 }) {
    console.log('list>>>', this.ctx.model.MetaData);
    return await this.ctx.model.MetaData.findAll({
      offset,
      limit,
      order: [
        ["created_at", "DESC"],
      ],
    });
  }

  async create(metadata, params) {
    // 先创建meta数据表，再创建子表
    const { ctx } = this;
    const metaRes = await ctx.model.MetaData.create(metadata).catch(err => ctx.throw(500, `创建meta数据失败,原因：${err}`));
    // console.log('this.ctx.model.MetaData metaRes>>>', metaRes);
    if (metadata.event_type === 'web_performance_timing' && params) {
      await ctx.model.Timing.create(params).catch(err => ctx.throw(500, `创建Timing数据失败,原因：${err}`));
    } else if (metadata.event_type === 'web_performance_lcp' && params) {
      await ctx.model.Lcp.create(params).catch(err => ctx.throw(500, `创建lcp数据失败,原因：${err}`));
    }
    return {
      uuid: metaRes.uuid
    }
  }

  async findOne(appid) {
    const { ctx } = this;
    // console.log('service find>>>>>>>>>>>>>>>>>>>>>>>>', ctx.model.Poject);
    if (!appid) {
      ctx.throw(404, 'appid not found')
    }
    const metadata = await ctx.model.MetaData.findOne({
      where: { app_id: appid },
    }).catch(e => {
        ctx.throw(404, `service findOne err: ${e}`)
    });
    if (!metadata) {
        ctx.throw(404, 'metadata not found')
    }
    return metadata;
  }

}

module.exports = MetaData;
