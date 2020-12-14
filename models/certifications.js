'use strict'

const Certifications = (sequelize, Sequelize) => {
    const certification = sequelize.define('certifications', {

        signature:Sequelize.TEXT,
        type: {
            type: Sequelize.ENUM,
            values: ['ENTREE', 'SORTIE'],
        }

    }, { freezeTableName: true })

    return certification
}

module.exports = { Certifications }
