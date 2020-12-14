const dbConfig = require("../config/db");

console.log(dbConfig.connectDb.DB)

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.connectDb.DB, dbConfig.connectDb.USER, dbConfig.connectDb.PASSWORD, {
    host: dbConfig.connectDb.HOST,
    dialect: dbConfig.connectDb.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.connectDb.pool.max,
        min: dbConfig.connectDb.pool.min,
        acquire: dbConfig.connectDb.pool.acquire,
        idle: dbConfig.connectDb.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// variable call models
db.users = require("./user").Users(sequelize, Sequelize);
db.appartments = require('./appartments').Appartments(sequelize, Sequelize);
db.certifications = require('./certifications').Certifications(sequelize, Sequelize);
db.equipments = require('./equipments').Equipments(sequelize, Sequelize);
db.pieces = require('./pieces').Pieces(sequelize, Sequelize);
db.signalisations = require('./signalisation').Signalisations(sequelize, Sequelize);
db.caution = require('./cautions').Cautions(sequelize, Sequelize);

db.appartments.hasMany(db.pieces, { onDelete: 'cascade' });
db.pieces.hasMany(db.equipments, { onDelete: 'cascade' });
db.users.belongsTo(db.appartments);
db.signalisations.belongsTo(db.users);
db.signalisations.belongsTo(db.appartments);
db.signalisations.belongsTo(db.pieces);
db.signalisations.belongsTo(db.equipments);
db.certifications.belongsTo(db.users);
db.certifications.belongsTo(db.appartments);
db.caution.belongsTo(db.users);
db.caution.belongsTo(db.appartments);

module.exports = db;
