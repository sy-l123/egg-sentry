module.exports = app => {
    const { STRING, INTEGER, FLOAT } = app.Sequelize;
    const Lcp = app.model.define('lcp', {
        id: { 
            type: INTEGER(11),
            primaryKey: true,
            autoIncrement: false,
        },
        lcpid: STRING(60),
        nodeName: STRING(255),
        nodeId: STRING(60),
        outerHTML: STRING(255),
        renderTime: FLOAT(10),
    });

    Lcp.associate = () => {
        app.model.Lcp.belongsTo(app.model.MetaData, {
            foreignKey: 'lcpid',
            targetKey: 'uuid',
        });
    };

    return Lcp
};