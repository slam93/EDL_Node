const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addDiagnostic2 = async (req, res) => {
    const diagnostic2 = await db.diagnostic2.build(req.body)
    if (!req.body.description) {
        return
    } else {
        diagnostic2.save()
        res.json({ 'data': diagnostic2 })
    }
}

const getByIdDiagnostic2 = async (req, res) => {
    const diagnostic2 = await db.diagnostic2.findAll({ where: { id: req.body.id } })
    res.json({ 'data': diagnostic2 })
}

const updateDiagnostic2 = async (req, res) => {
    const diagnostic2 = await db.diagnostic2.findByPk(req.body.id)
    diagnostic2.update(req.body)
    if (diagnostic2 === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': diagnostic2 })
    }
}

const getAllDiagnostic2 = async (req, res) => {
    const diagnostic2 = await db.diagnostic2.findAll({
        include: [
            { model: db.sections }   
        ]     
    })
    res.json({ 'data': diagnostic2 })
}

const deleteDiagnostic2 = async (req, res) => {
    try {
        if (req.body.id) {
            await db.diagnostic2.destroy({ where: { id: req.body.id } })
            console.log("try delete ...")
            res.json({ 'message': 'data supprimé' })
        } else {
            res.json({ 'message': 'id deleted not found' })
        }
    } catch (error) {
        res.json({ 'message': `${error}` })
    }
}

const getAllDiagnostic2Public = async (req, res) => {
    const diagnostic2 = await db.diagnostic2.findAll({
        include: [
            { model: db.sections }
        ]
    })
    res.json({ 'data': diagnostic2 })
}

const getDiagnostic2BySectionId = async (req, res) => {
    const diagnostic2section = await db.diagnostic2.findAll({ where: { sectionId: req.body.sectionId } })
    res.json({ 'data': diagnostic2section })
}


module.exports = {
    addDiagnostic2,
    updateDiagnostic2,
    getAllDiagnostic2,
    deleteDiagnostic2,
    getByIdDiagnostic2,
    getAllDiagnostic2Public,
    getDiagnostic2BySectionId
}