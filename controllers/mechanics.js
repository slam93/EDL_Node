const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addMechanic = async (req, res) => {
    const mechanic = await db.mechanics.build(req.body);
    if (!req.body.name) {
        return
    } else {
        mechanic.save();
        res.json({ 'data': mechanic })
    }
}

const updateMechanic = async (req, res) => {
    const mechanic = await db.mechanics.findByPk(req.body.id)
    mechanic.update(req.body)
    if (mechanic === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': mechanic })
    }
}

const getAllMechanic = async (req, res) => {
    const mechanic = await db.mechanics.findAll(req.body)
    res.json({ 'data': mechanic })
}


const getByUserIdMechanic = async (req, res) => {
    const mechanic = await db.mechanics.findAll({ where: { userId: req.body.userId },
        include: [
            { model: db.users }   
        ]  
})
    res.json({ 'data': mechanic })
}

const deleteMechanic = async (req, res) => {
    try {
        if (req.body.id) {
            await db.mechanics.destroy({ where: { id: req.body.id } })
            console.log("try delete ...")
            res.json({ 'message': 'data supprimé' })
        } else {
            res.json({ 'message': 'id deleted not found' })
        }
    } catch (error) {
        res.json({ 'message': `${error}` })
    }
}

const getMechanicSkills = async (req, res) => {

    const skill = await db.skills.findAll({
        where: {
            diagnostic2Id: req.body.diagnostic2Id,
            diagnostic1Id: req.body.diagnostic1Id,
            vehicleId: req.body.vehicleId,
        },
        include: [
            { model: db.users },
            { model: db.diagnostic1 },
            { model: db.diagnostic2 },
            { model: db.vehicles }
        ]
    })

    console.log('skill =>', skill[0])
    // let user = skill[0].dataValues.userId

    const mechanic = await db.mechanics.findAll({
        // where: {
        //     userId: user
        // },
        include: [
            { model: db.users }
        ]
    })

    res.json({ 'data': [mechanic, skill] })
}

module.exports = {
    addMechanic,
    updateMechanic,
    getAllMechanic,
    deleteMechanic,
    getMechanicSkills,
    getByUserIdMechanic
}