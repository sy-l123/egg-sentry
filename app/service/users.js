const Service = require('egg').Service;

class Users extends Service {
  async login(usernameOrEmail, password) {
    var user = await this.ctx.model.Users.findOne({
      where: {
        $or: [
          { username: usernameOrEmail },
          { emailaddress: usernameOrEmail },
        ],
      },
    });

    var success = false;
    var error = "";
    if (user) {
      if (user.password === password) {
        success = true;
      } else {
        error = "密码错误";
      }
    } else {
      error = "用户不存在";
    }
    return {
      success,
      error,
    };
  }

  async list({ offset = 0, limit = 10 }) {
    console.log('list>>>', this.ctx.model.Users);
    return await this.ctx.model.Users.findAll({
      offset,
      limit,
      order: [
        ["id", "DESC"],
        ["created_at", "DESC"],
      ],
    });
  }

  async create(user) {
    return await this.ctx.model.Users.create(user).catch(e => {
      this.ctx.throw(422, e);
    });
  }

  async find(id) {
    const user = await this.ctx.model.Users.findByPk(id).catch(e => {
      this.ctx.throw(404, e);
    });
    return user;
  }

  async update(id, updates) {
    const user = await this.ctx.model.Users.findByPk(id).catch(e => {
        this.ctx.throw(404, e)
    });
    if (!user) {
        this.ctx.throw(404, 'user not found')
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.Users.findByPk(id).catch(e => {
        this.ctx.throw(404, 'user not found, reason' + e)
    });
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user.destroy();
  }

}

module.exports = Users;
