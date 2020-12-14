const {Op} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addSkill = async (req, res) => {
    const skill = await db.skills.build(req.body)
    if (!req.body.description) {
        return
    } else {
        skill.save()
        res.json({ 'data': skill })
    }
}

const updateSkill = async (req, res) => {
    const skill = await db.skills.findByPk(req.body.id)
    skill.update(req.body)
    if (skill === null) {
        console.log('Not found!')
    } else {
        res.json({ 'data': skill })
    }
}

const getAllSkill = async (req, res) => {
    const skill = await db.skills.findAll(req.body)
    res.json({ 'data': skill })
}

const deleteSkill = async (req, res) => {
    try {
        if (req.body.id) {
            await db.skills.destroy({ where: { id: req.body.id } })
            console.log("try delete ...")
            res.json({ 'message': 'data supprimé' })
        } else {
            res.json({ 'message': 'id deleted not found' })
        }
    } catch (error) {
        res.json({ 'message': `${error}` })
    }
}

const getSkillAndVehicles = async (req, res) => {
    const skill = await db.skills.findAll({
        include : [
            {model: db.vehicles}
        ]
    })
    res.json({ 'data': skill })
}

const getUserIdSkills = async (req, res) => {
    const skill = await db.skills.findAll({
        where: {userId : req.body.userId},
        include: [
            {model: db.vehicles},
            {model: db.diagnostic1},
            {model: db.diagnostic2}
        ]
    })
    res.json({'data': skill})
}

const getSkillsBYDiagnostic2 = async (req, res) => {
    const skill = await db.skills.findAll({
        where: {
            // diagnostic2Id : req.body.diagnostic2Id
            [Op.or] : [
                {diagnostic2Id: req.body.diagnostic2Id}
            ]
        },
        include: [
            {model: db.vehicles},
            {model: db.diagnostic1},
            {model: db.diagnostic2},
            {model: db.users}
        ],

        // attributes: ['userId', [Sequelize.fn('count', Sequelize.col('userId')), 'cnt']],
        // group: ['userId'],
        // group: ['diagnostic2Id']
    })
    res.json({'data': skill})
}

module.exports = {
    addSkill,
    updateSkill,
    getAllSkill,
    deleteSkill,
    getSkillAndVehicles,
    getUserIdSkills,
    getSkillsBYDiagnostic2
}