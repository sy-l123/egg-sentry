'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, FLOAT } = Sequelize;
    await queryInterface.createTable('timing', {
      id: { 
        type: INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      timingid: {
        type: STRING(60),
        allowNull: false,
        references: {
            model: 'meta_data', // 指定关联的模型
            key: 'uuid'     // 指定关联模型的主键字段
        },
        onUpdate: 'CASCADE', // 当 meta_data 的 appid 更新时，timing 的 timingid 也更新
        onDelete: 'CASCADE' // 当 meta_data 被删除时，timing 也删除
      },
      connect: {
        allowNull: true,
        type: FLOAT(10),
      },
      ttfb: {
        allowNull: true,
        type: FLOAT(10),
      },
      response: {
        allowNull: true,
        type: FLOAT(10),
      },
      parse: {
        allowNull: true,
        type: FLOAT(10),
      },
      resource: {
        allowNull: true,
        type: FLOAT(10),
      },
      first_screen: {
        allowNull: true,
        type: FLOAT(10),
      },
      tti: {
        allowNull: true,
        type: FLOAT(10),
      },
      load: {
        allowNull: true,
        type: FLOAT(10),
      },
      fcp: {
        allowNull: true,
        type: FLOAT(10),
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
    await queryInterface.dropTable('timing');
  },
};
