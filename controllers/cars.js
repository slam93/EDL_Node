const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addCar = async (req, res) => {
    const car = await db.cars.build(req.body)
    if (!req.body.immatriculation) {
        return
    } else {
        car.save()
        res.json({ 'data': car })
    }
}

const updateCars = async (req, res) => {
    const car = await db.cars.findByPk(req.body.id)

    car.update(req.body)
    if (car === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': car })
    }
}

const getAllCar = async (req, res) => {
    const car = await db.cars.findAll(req.body)
    res.json({ 'data': car })
}

const getByUserCar = async (req, res) => {
    const car = await db.cars.findAll({ where: { userId: req.body.userId } })
    res.json({ 'data': car })
}

const deleteCar = async (req, res) => {
    try {
        if (req.body.id) {
            await db.cars.destroy({ where: { id: req.body.id } })
            console.log("try delete ...")
            res.json({ 'message': 'data supprimé' })
        } else {
            res.json({ 'message': 'id deleted not found' })
        }
    } catch (error) {
        res.json({ 'message': `${error}` })
    }
    // const car = await db.cars.findByPk(req.body.id)
    // if (!req.body.id) {
    //     console.log('==> id deleting inexistant')
    //     res.send(500);
    // } else {
    //     try {
    //         car.destroy({ cascade: true }).then(function () {
    //             res.send(200);
    //         });
    //     } catch (error) {
    //         car.destroy({ cascade: true }).then(function () {
    //             res.send(200);
    //         });
    //     }

    //     console.log('===> suppression car OK');
    // }
}

module.exports = {
    addCar,
    updateCars,
    getAllCar,
    getByUserCar,
    deleteCar
}
