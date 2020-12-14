'use strict'

const Signalisations = (sequelize, Sequelize) => {
    const signalisation = sequelize.define('signalisations', {
        quantity:Sequelize.DECIMAL,
        etat: Sequelize.STRING,
        explication: {
            type:Sequelize.STRING,
            allowNull: true
        },
        photo: Sequelize.STRING,
        type: {
            type: Sequelize.ENUM,
            values: ['ENTREE', 'SEJOUR', 'SORTIE'],
        },
        price: Sequelize.FLOAT,
        majore:  Sequelize.BOOLEAN
    }, { freezeTableName: true });

    return signalisation
};

module.exports = { Signalisations };
