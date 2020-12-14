const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addDiagnostic1 = async (req, res) => {
    const diagnostic1 = await db.diagnostic1.build(req.body)
    if (!req.body.description) {
        return
    } else {
        diagnostic1.save()
        res.json({ 'data': diagnostic1 })
    }
}

const updateDiagnostic1 = async (req, res) => {
    const diagnostic1 = await db.diagnostic1.findByPk(req.body.id)
    diagnostic1.update(req.body)
    if (diagnostic1 === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': diagnostic1 })
    }
}

const getAllDiagnostic1 = async (req, res) => {
    const diagnostic1 = await db.diagnostic1.findAll(req.body)
    res.json({ 'data': diagnostic1 })
}


const getByIdDiagnostic1 = async (req, res) => {
    const diagnostic1 = await db.diagnostic1.findAll({ where: { id: req.body.id } })
    res.json({ 'data': diagnostic1 })
}


const deleteDiagnostic1 = async (req, res) => {
    try {
        if (req.body.id) {
            await db.diagnostic1.destroy({ where: { id: req.body.id } })
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
    addDiagnostic1,
    updateDiagnostic1,
    getAllDiagnostic1,
    deleteDiagnostic1,
    getByIdDiagnostic1
}