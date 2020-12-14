'use strict'

const Equipments = (sequelize, Sequelize) => {
    const equipments = sequelize.define('equipments', {

        description_FR: Sequelize.STRING,
        description_EN: Sequelize.STRING,
        quantity:Sequelize.DECIMAL,
        price_equipment:Sequelize.FLOAT,
        price_majore:Sequelize.FLOAT,
    }, { freezaTableName: true });

    return equipments
};

module.exports = { Equipments };
