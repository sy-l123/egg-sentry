const { Controller } = require('egg');

class NewsController extends Controller {
  async list() {
    const { ctx } = this;
    console.log('query', ctx.query);
    const page = ctx.query.page || 1;
    const dataList = await ctx.service.news.list(page);
    // const dataList = [
    //   { id: 1, title: 'This is news 1', url: '/news/1' },
    //   { id: 2, title: 'This is news 2', url: '/news/2' },
    // ];
    console.log('dataList??>>>>>>>>>', dataList);
    await ctx.render('news/list.tpl', { list: dataList, page });
  }
}

module.exports = NewsController;
