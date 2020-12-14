const db = require('../models')
const Sequelize = require("sequelize");

/**
* @param req
* @param res
* @returns {*}
*/

const addSubscription = async (req, res) => {
    const subscription = await db.subscriptions.build(req.body)
    if (!req.body.userId) {
        console.log('userId required')
        return
    } else {
        subscription.save();
        res.json({ 'data': subscription })
    }
}

const updateSubscriptions = async (req, res) => {
    const subscription = await db.subscriptions.findByPk(req.body.id)
    subscription.update(req.body)
    if (subscription === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': subscription })
    }
}

const getAllSubscription = async (req, res) => {
    const subscription = await db.subscriptions.findAll(req.body)
    res.json({ 'data': subscription })
}

const getClientSubscription = async (req, res) => {
    const response = await db.subscriptions.findAll({
        where: {
            userId: req.body.userId,
            status: 'PAYE'
        },
        include: [
            { model: db.users },
            { model: db.categories },
        ]
    })
    res.json({ 'data': response })
}


// Requete get max with Sequelize
const getClientSubscriptionMax = async (req, res) => {
    const response = await db.subscriptions.max('id', {where: { userId: req.body.userId,  }});
    res.json({ 'data': response })
}


module.exports = {
    addSubscription,
    updateSubscriptions,
    getAllSubscription,
    getClientSubscription,
    getClientSubscriptionMax
}