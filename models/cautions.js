'use strict'

const Cautions = (sequelize, Sequelize) => {
    const caution = sequelize.define('cautions', {
        initial: Sequelize.FLOAT,
        retenu: Sequelize.FLOAT,
        remborsee: Sequelize.FLOAT,
    }, { freezaTableName: true });

    return caution
}

module.exports = { Cautions }
