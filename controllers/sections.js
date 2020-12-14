const db = require("../models");

/**
* @param req
* @param res
* @returns {*}
*/

const addSections = async (req, res) => {
    const section = await db.sections.build(req.body)
    section.save()
    console.log('insert OK Sections')
    res.json({ 'data': section })
}

const updateSections = async (req, res) => {
    const section = await db.sections.findByPk(req.body.id)
    section.update(req.body)
    if (section === null) {
        console.log('Not found!')
    } else {
        console.log(section instanceof db.sections)
        res.json({ 'data': section })
    }
}

const deleteSections = async (req, res) => {
    try {
        if (req.body.id) {
            await db.sections.destroy({ where: { id: req.body.id } })
            console.log("try delete ...")
            res.json({ 'message': 'data supprimé' })
        } else {
            res.json({ 'message': 'id deleted not found' })
        }
    } catch (error) {
        res.json({ 'message': `${error}` })
    }
}

// const deleteAllSections = async () => {
//     await db.sections.destroy({
//         cascade: false,
//         truncate: true
//     })
//     console.log('===> all section deleted')
// }

const getAllSections = async (req, res) => {
    const section = await db.sections.findAll({
        include: [
            {model: db.diagnostic2}
        ]
    })
    res.json({ 'data': section })
}

module.exports = {
    addSections,
    updateSections,
    deleteSections,
    // deleteAllSections,
    getAllSections
}