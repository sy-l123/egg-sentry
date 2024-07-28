// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
    this.config = this.ctx.app.config.news;
    this.serverUrl = this.config.serverUrl;
    this.pageSize = this.config.pageSize;
  }

  async request(api, opts) {
    const options = Object.assign({
      dataType: 'json',
      timeout: [ '30s', '30s' ],
    }, opts);

    const result = await this.ctx.curl(`${this.serverUrl}/${api}`, options);
    console.log(result.data);
    return result.data;
  }

  async list(page = 1) {
    // use build-in http client to GET hacker-news api
    const idList = await this.request('topstories.json', {
      data: {
        orderBy: '"$key"',
        startAt: `"${this.pageSize * (page - 1)}"`,
        endAt: `"${this.pageSize * page - 1}"`,
      },
    });

    if (!idList) {
      return [];
    }
    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${this.serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map(res => res.data);
  }
}

module.exports = NewsService;
