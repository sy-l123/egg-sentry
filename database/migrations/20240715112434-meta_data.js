'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING } = Sequelize;
    await queryInterface.createTable('meta_data', {
      uuid: { type: STRING(255), primaryKey: true, autoIncrement: false, allowNull: false },
      version: {
        allowNull: true,
        type: STRING(255),
      },
      os: {
        allowNull: true,
        type: STRING(255),
      },
      explore: {
        allowNull: true,
        type: STRING(255),
      },
      terminal: {
        allowNull: true,
        type: STRING(255),
      },
      language: {
        allowNull: true,
        type: STRING(255),
      },
      sdk_version: {
        allowNull: true,
        type: STRING(255),
      },
      env: {
        allowNull: true,
        type: STRING(255),
      },
      event_type: STRING(255),
      event_name: STRING(255),
      app_id: {
        type: STRING(30),
        allowNull: false,
        references: {
          model: 'monitor_project', // 指定关联的模型
          key: 'appid'     // 指定关联模型的主键字段
        },
        onUpdate: 'CASCADE', // 当 Project 的 appid 更新时，Meta 的 app_id 也更新
        onDelete: 'CASCADE' // 当 Project 被删除时，Meta 也删除
      },
      path: {
        allowNull: true,
        type: STRING,
      },
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

  down: async queryInterface => {
    await queryInterface.dropTable('meta_data');
  },
};
