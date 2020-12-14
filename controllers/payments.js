const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addPayment = async (req, res) => {
    const payment = await db.payments.build(req.body)
    // if (!req.body.userId) {
    //     return
    // } else {
        payment.save()
        res.json({ 'data': payment })
    //}
}

// const updatePayment = async (req, res) => {
//     const payment = await db.payments.findByPk(req.body.id)
//     payment.update(req.body)
//     if (payment === null) {
//         console.log('Not found!')
//     } else {
//         res.json({ 'data': payment })
//     }
// }

const getAllPayment = async (req, res) => {
    const payment = await db.payments.findAll(req.body)
    res.json({ 'data': payment })
}

const getPaymentClient = async (req, res) => {
    const response = await db.payments.findAll({
        where: {
            userId: req.body.userId,
            // userMec: req.body.userMec,
        },
        include: [
            { model: db.users }
        ]
    })
    res.json({ 'data': response })
}

// const deletePayment = async (req, res) => {
//     const payment = await db.payments.findByPk(req.body.id)
//     if (!req.body.id) {
//         console.log('==> id deleting inexistant')
//         return
//     } else {
//         payment.destroy({ cascade: true })
//         console.log('===> suppression payment OK')
//     }
// }

module.exports = {
    addPayment,
    // updatePayment,
    getAllPayment,
    // deletePayment
    getPaymentClient
}