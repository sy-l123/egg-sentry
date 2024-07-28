module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const MetaData = app.model.define('meta_data', {
        uuid: { type: STRING(255), primaryKey: true, autoIncrement: false },
        version: STRING(255),
        os: STRING(255),
        explore: STRING(255),
        terminal: STRING(255),
        language: STRING(255),
        sdk_version: STRING(255),
        env: STRING(255),
        event_type: STRING(255),
        event_name: STRING(255),
        app_id: STRING(20),
        path: STRING(255),
    });

    MetaData.associate = () => {
        app.model.MetaData.belongsTo(app.model.Project, {
            foreignKey: 'app_id',
            targetKey: 'appid',
        });
        app.model.MetaData.hasMany(app.model.Timing, {
            foreignKey: 'timingid',
            targetKey: 'uuid',
        });
        app.model.MetaData.hasMany(app.model.Lcp, {
            foreignKey: 'lcpid',
            targetKey: 'uuid',
        });
    };

    return MetaData
};