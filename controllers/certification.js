const db = require('../models')

/**
 * @param req
 * @param res
 * @returns {*}
 */

const certification = async (req, res) => {
    const certification = await db.certifications.build(req.body);
    certification.save();
    res.json({ 'data': certification })
};

getCertificationType = async (req, res) => {
    const certification = await db.certifications.findOne({
        where:{
            type: req.body.type,
            userId: req.body.userId,
            appartmentId: req.body.appartmentId
        }
    });
    res.json({ 'data': certification })
};


module.exports = {
    certification,
    getCertificationType
};
