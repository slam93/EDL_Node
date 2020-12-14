const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addCategory = async (req, res) => {
    const category = await db.categories.build(req.body)
    if (!req.body.description) {
        return
    } else {
        category.save()
        res.json({ 'data': category })
    }
}

const updateCategory = async (req, res) => {
    const category = await db.categories.findByPk(req.body.id)
    category.update(req.body)
    if (category === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': category })
    }
}

const getAllCategory = async (req, res) => {
    const category = await db.categories.findAll(req.body)
    res.json({ 'data': category })
}

const deleteCategory = async (req, res) => {
    try {
        if (req.body.id) {
            await db.categories.destroy({ where: { id: req.body.id } })
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
    addCategory,
    updateCategory,
    getAllCategory,
    deleteCategory
}