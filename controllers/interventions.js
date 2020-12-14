const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addInterventions = async (req, res) => {
    const interventions = await db.interventions.build(req.body)
    if (!req.body.userId) {
        console.log('====> userId vide : required')
        return
    } else {
        interventions.save()
        console.log('insert OK Sections')
        res.json({ 'data': interventions })
    }
}
const getIntervention = async (req, res) => {
    
    const interventions = await db.interventions.findOne({
        where: {
          id: req.body.interventionId
        },
        include: [
            { model: db.diagnostic1 },
            { model: db.users },
            { model: db.mechanics },
            { model: db.cars },
            { model: db.vehicles },
        ]
    })
    if (interventions === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': interventions })
    }
}

const updateInterventions = async (req, res) => {
    const interventions = await db.interventions.findByPk(req.body.id)
    interventions.update(req.body)
    if (interventions === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': interventions })
    }
}


const getByUserInterventions = async (req, res) => {
    const interventions = await db.interventions.findAll({
        where: { userId: req.body.userId },
        include: [{
            model: db.users,
            required: true
        }]
    })
    res.json({ 'data': interventions })
}


const getByMecanoInterventions = async (req, res) => {
    const interventions = await db.interventions.findAll({
        where: { mechanicId: req.body.mechanicId },
        include: [
            {
                model: db.users,
                required: true
            },
            {
                model: db.vehicles,
                required: true
            }
        ]
    })
    res.json({ 'data': interventions })
}


const getClientInterventions = async (req, res) => {
    const response = await db.interventions.findAll({
        where: {
            userId: req.body.userId,
            // userMec: req.body.userMec,
        },
        include: [
            { model: db.diagnostic1 },
            { model: db.users },
            { model: db.mechanics },
            { model: db.cars },
            { model: db.vehicles },
        ]
    })
    res.json({ 'data': response })
}

module.exports = {
    addInterventions,
    updateInterventions,
    getByUserInterventions,
    getByMecanoInterventions,
    getClientInterventions,
    getIntervention
}