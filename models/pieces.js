'use strict'

const Pieces = (sequelize, Sequelize) => {
    const piece = sequelize.define('pieces', {

        name_FR: Sequelize.STRING,
        name_EN: Sequelize.STRING
    }, { freezaTableName: true })

    return piece
}

module.exports = { Pieces }
