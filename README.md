# eggTest



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### Deploy

```bash
npm start
npm stop
```

[egg]: https://eggjs.org

### 安装依赖

- 安装 mysql 并建立数据库

```bash
brew install mysql # macOS


安装完提示：
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -u root

To restart mysql after an upgrade:
  brew services restart mysql
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/mysql/bin/mysqld_safe --datadir\=/opt/homebrew/var/mysql



启动mysql
启动问题参考：
https://dev.mysql.com/doc/refman/8.4/en/can-not-connect-to-server.html
旧版：
启动
brew services start mysql
停止
brew services stop mysql
重启
brew services restart mysql

新版！！！
启动
myaqld
停止
mysqladmin shutdown

# 使用管理员账号（root）登录MySQL服务器
mysql -u root -p

ALTER USER 'root'@'localhost' IDENTIFIED BY '123'

# 授予权限
## 如果用户没有足够的权限，你可以使用GRANT语句来授予权限。例如，授予所有数据库的所有权限：
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost'
# 修改密码
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('123')
SET PASSWORD FOR 'root'@'localhost' = '123'
# 刷新权限 立即生效
FLUSH PRIVILEGES;

# 运行下面命令创建数据库；也可以使用下面ORM框架的 sequelize 来创建数据库
mysql
  > create database `egg-example-dev`;
  > create database `egg-example-unittest`;
```

# sequelize

### 配置文件 database/config.json
配置文件告诉 CLI 如何连接到数据库

### 配置表（有关联关系的表，创建时要有先后顺序）
```bash

创建表(读取配置文件，默认development环境的配置)
npx sequelize db:create

数据库迁移  执行database/migrations目录文件，对数据库进行结构的创建，修改等操作（zhuyi wenjian shunxu ）
npx sequelize db:migrate

db:migrate:undo             - 撤销上一次的迁移操作         
db:migrate:undo:all             - 撤销所有的迁移操作


生成种子文件，作用是构建数据 （name 后边接的是自定义的名字，例子：userseed）
npx sequelize seed:generate --name userseed

执行种子
npx sequelize db:seed:all


sequelize为现有表添加字段
1、生成迁移文件：使用 Sequelize CLI 来生成迁移文件。
sequelize migration:generate --name add-new-field-to-my-model
2、编写迁移逻辑：在生成的迁移文件中，添加逻辑来添加新字段。
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('myModels', 'newField', {
            type: Sequelize.STRING
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('myModels', 'newField');
    }
};
3、执行迁移：使用 Sequelize CLI 来执行迁移，将更改应用到数据库。
sequelize db:migrate

```






# 表：USERS

## 用户
列表：
http://127.0.0.1:7002/users get请求

新建用户：
http://127.0.0.1:7002/users post请求
入参json:
 {"name": "蔡徐坤", "age": 30, "created_at": "2024-06-28 09:00:00", "updated_at": "2024-06-28 09:00:00"}

编辑用户 id 为1:
http://127.0.0.1:7002/users/1 put请求
入参json:
{
    "name": "范闲",
    "age": 30,
    "created_at": "2024-06-28 09:00:00",
    "updated_at": "2024-06-28 09:00:00"
}

删除用户 id 为2:
http://127.0.0.1:7002/users/2 delete请求
响应：
OK

查询用户 id 为7:
http://127.0.0.1:7002/users/7 get请求
响应：
{
    "id": 7,
    "name": "蔡徐坤",
    "age": 30,
    "created_at": null,
    "updated_at": null
}

## 监控数据
上传数据：
http://127.0.0.1:8080/api/v1/metadata post请求
入参body json:
[
    {
        "meta": {
            "uuid": "b60517720d344cbca27655b9060696e9",
            "version": "5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            "os": "MacIntel",
            "sdk_version": "1.9.1",
            "language": "zh",
            "explore": "1",
            "terminal": "1",
            "event_type": "web_performance_timing",
            "event_name": "性能指标",
            "app_id": "mcflurry",
            "env": "dev",
            "path": "http://localhost:8000/mcflurry/editor/"
        },
        "params": {
            "timingid": "b60517720d344cbca27655b9060696e9",
            "connect": "1.0.0",
            "ttfb": "2",
            "response": "1",
            "parse": "1.9.1",
            "load": "233.3",
            "resource": "1",
            "tti": "1",
            "first_screen": "331",
            "fcp": "212"
        }
    },
    {
        "meta": {
            "uuid": "7dda3f94e2b049f4bffb82087c7bb245",
            "version": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            "os": "MacIntel",
            "sdk_version": "1.9.1",
            "language": "zh",
            "explore": "1",
            "terminal": "1",
            "event_type": "web_performance_lcp",
            "event_name": "性能指标",
            "app_id": "mcflurry",
            "env": "dev",
            "path": "http://localhost:8000/mcflurry/editor/"
        },
        "params": {
            "renderTime": "1162.1000000014901",
            "lcpid": "7dda3f94e2b049f4bffb82087c7bb245",
            "nodeName": "DIV",
            "outerHTML": "<div></div>",
            "nodeId": ""
        }
    }
]