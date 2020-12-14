const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const updateDonation = async (req, res) => {
    const donation = await db.donations.findByPk(req.body.id)
    donation.update(req.body)
    if (donation === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': donation })
    }
}

const getAllDonation = async (req, res) => {
    const donation = await db.donations.findAll(req.body)
    res.json({ 'data': donation })
}

module.exports = {
    updateDonation,
    getAllDonation
}