'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('monitor_project', {
      appid: { type: STRING(30), primaryKey: true, autoIncrement: false },
      name: {
        allowNull: false,
        type: STRING(30),
      },
      user_id: {
          type: STRING,
          allowNull: false,
          references: {
              model: 'users', // 指定关联的模型
              key: 'id'     // 指定关联模型的主键字段
          },
          onUpdate: 'CASCADE', // 当 User 的 id 更新时，Project 的 user_id 也更新
          onDelete: 'CASCADE' // 当 User 被删除时， Project也删除
      },
      created_at: {
        allowNull: false,
        type: DATE,
      },
      updated_at: {
        allowNull: false,
        type: DATE,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 meta_data 表
  down: async queryInterface => {
    await queryInterface.dropTable('monitor_project');
  },
};
