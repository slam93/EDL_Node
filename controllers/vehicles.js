const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addVehicle = async (req, res) => {
    const vehicle = await db.vehicles.build(req.body)
    if (!req.body.band) {
        return
    } else {
        vehicle.save()
        res.json({ 'data': vehicle })
    }
}

const updateVehicle = async (req, res) => {
    const vehicle = await db.vehicles.findByPk(req.body.id)
    vehicle.update(req.body)
    if (vehicle === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': vehicle })
    }
}

const getAllVehicle = async (req, res) => {
    const vehicle = await db.vehicles.findAll(req.body)
    res.json({ 'data': vehicle })
}


const getByIdVehicle = async (req, res) => {
    const vehicle = await db.vehicles.findAll( { where : {id: req.body.id} } )
    res.json({ 'data': vehicle })
}


const deleteVehicle = async (req, res) => {
    try {
        if (req.body.id) {
            await db.vehicles.destroy({ where: { id: req.body.id } })
            console.log("try delete ...")
            res.json({ 'message': 'data supprimé' })
        } else {
            res.json({ 'message': 'id deleted not found' })
        }
    } catch (error) {
        res.json({ 'message': `${error}` })
    }
}

module.exports = {
    addVehicle,
    updateVehicle,
    getAllVehicle,
    getByIdVehicle,
    deleteVehicle
}