const Service = require('egg').Service;

class Project extends Service {
  async list({ offset = 0, limit = 10 }) {
    console.log('list>>>', this.ctx.model.Project);
    return await this.ctx.model.Project.findAll({
      offset,
      limit,
    });
  }

  async findAll(query) {
    const { ctx } = this;
    const project = await ctx.model.Project.findAll({
      where: { appid: query.appid },
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      include: [
        {
          model: ctx.model.MetaData,
          include: [
            {
              model: ctx.model.Timing,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
          where: { event_type: query.eventType },
        }
      ]
    }).catch(e => {
        ctx.throw(404, e)
    });
    if (!project) {
        ctx.throw(404, '项目不存在!')
    }
    return project;
  }

}

module.exports = Project;
