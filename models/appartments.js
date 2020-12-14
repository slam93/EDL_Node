'use strict'

const Appartments = (sequelize, Sequelize) => {
    const appartments = sequelize.define('appartments', {

        numeros: Sequelize.STRING,
        type: {
            type: Sequelize.STRING,
            allowNull: true
        },
        caution: Sequelize.FLOAT,
        qrcode:Sequelize.STRING,
    }, { freezaTableName: true });

    return appartments
}

module.exports = { Appartments }
