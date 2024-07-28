module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    
    const Users = app.model.define('users', {
        id: { type: STRING, primaryKey: true, autoIncrement: false },
        name: STRING(60),
        email: STRING(255),
        password: STRING(64),
    });

    Users.prototype.associate = () => {
        app.model.Users.hasMany(app.model.Project, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    };
    return Users
};