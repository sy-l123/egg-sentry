module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const MonitorProject = app.model.define('monitor_project', {
        appid: { type: STRING, primaryKey: true, autoIncrement: false },
        name: STRING(30),
        user_id: STRING,
    });

    MonitorProject.associate = () => {
        app.model.Project.hasMany(app.model.MetaData, {
            foreignKey: 'app_id',
            targetKey: 'appid',
        });
        app.model.Project.belongsTo(app.model.Users, { foreignKey: 'user_id', targetKey: 'id' });
    };

    return MonitorProject
};