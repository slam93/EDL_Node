const db = require('../models')

/**
 * @param req
 * @param res
 * @returns {*}
 */

const signalisation = async (req, res) => {
    const signalisations = await db.signalisations.build(req.body);
    signalisations.save();
    const caution = await db.caution.findOne({where: { userId: req.body.userId, appartmentId: req.body.appartmentId }});
    let retenu = caution.retenu + req.body.price;
    let remborsee = caution.initial - retenu;
    if(remborsee < 0){
        remborsee = 0;
    }
    caution.update({retenu:retenu, remborsee:remborsee});
    res.json({'success':true, 'data': signalisations })
};

const getSignalisationType = async (req, res) => {
    const signalisations = await db.signalisations.findAll({
        where:{
            type: req.body.type,
            userId: req.body.userId,
            appartmentId: req.body.appartmentId
        },
        include: [
            {
                model: db.equipments,
            }
        ]
    });
    res.json({ 'data': signalisations })
};

const getSignalisation = async (req, res) => {
    const signalisations = await db.signalisations.findAll({
        where:{
            userId: req.body.userId,
            appartmentId: req.body.appartmentId
        }
    });
    res.json({ 'data': signalisations })
};

const deleteSignalisation = async (req, res) => {
    const signalisation = await db.signalisations.findOne({where: {id: req.body.signalisationId}});
    const price = signalisation.price;
    const caution = await db.caution.findOne({where: { userId: req.body.userId, appartmentId: req.body.appartmentId }});
    let retenu = caution.retenu - price;
    let remborsee = caution.initial - retenu;
    await db.signalisations.destroy({ where: { id: req.body.signalisationId } });
    caution.update({retenu:retenu, remborsee:remborsee});
    res.json({ 'success': true })
};

module.exports = {
    signalisation,
    getSignalisationType,
    getSignalisation,
    deleteSignalisation
};
