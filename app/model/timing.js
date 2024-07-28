module.exports = app => {
    const { STRING, INTEGER, FLOAT } = app.Sequelize;
    const Timing = app.model.define('timing', {
        id: { 
            type: INTEGER(11),
            primaryKey: true,
            autoIncrement: false,
        },
        timingid: STRING(60),
        connect: FLOAT(10),
        ttfb: FLOAT(10),
        response: FLOAT(10),
        parse: FLOAT(10),
        resource: FLOAT(10),
        first_screen: FLOAT(10),
        tti: FLOAT(10),
        load: FLOAT(10),
        fcp: FLOAT(10),
    });

    Timing.associate = () => {
        app.model.Timing.belongsTo(app.model.MetaData, {
            foreignKey: 'timingid',
            targetKey: 'uuid',
        });
    };

    return Timing
};