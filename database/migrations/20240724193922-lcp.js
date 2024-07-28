'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, FLOAT } = Sequelize;
    await queryInterface.createTable('lcp', {
      id: { 
        type: INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      lcpid: {
        type: STRING(60),
        allowNull: false,
        references: {
            model: 'meta_data', // 指定关联的模型
            key: 'uuid'     // 指定关联模型的主键字段
        },
        onUpdate: 'CASCADE', // 当 meta_data 的 appid 更新时，lcp 的 lcpid 也更新
        onDelete: 'CASCADE' // 当 meta_data 被删除时，lcp 也删除
      },
      nodeName: STRING(255),
      nodeId: {
        allowNull: true,
        type: STRING(60),
      },
      outerHTML: {
        allowNull: true,
        type: STRING(255),
      },
      renderTime: FLOAT(10),
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
    await queryInterface.dropTable('lcp');
  },
};
