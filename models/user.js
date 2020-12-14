'use strict';
// Model Entity Constructor
const Users = (sequelize, Sequelize) => {
    // const créer table
    const users = sequelize.define("users", {
        // creer entity table
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        last_name: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        role: {
            type: Sequelize.ENUM,
            values: ['ADMIN', 'CLIENT']
        },
        code_sejour:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        date_end_sejour: {
            type: Sequelize.DATE,
            allowNull: true
        },
        actif:  Sequelize.BOOLEAN
    }, { freezeTableName: true });
    return users;
}

module.exports = { Users };
