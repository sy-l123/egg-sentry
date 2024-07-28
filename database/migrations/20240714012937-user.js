'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: STRING, primaryKey: true, autoIncrement: false },
      name: STRING(60),
      email: {
        allowNull: true,
        type: STRING(255),
      },
      password: STRING(64),
      created_at: {
        allowNull: false,
        type: DATE,
      },
      updated_at: {
        allowNull: false,
        type: DATE,
      }
    });
  },
  // 在执行数据库降级时调用的函数，删除 monitor_project 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
