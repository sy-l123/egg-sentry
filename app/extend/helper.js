const moment = require('moment');

module.exports = {
  json(data, msg, code, addition) {
    return Object.assign({
      state: data ? 'success' : 'fail',
      message: msg,
      code: code || (data ? 200 : 404),
      data,
    }, addition);
  },
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  changeTime(time) {
    return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
  },
  relativeTime(time) {
    return moment(new Date(time * 1000)).fromNow()
  },
};
