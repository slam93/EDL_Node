const db = require('../models')

/**
 * @param req
 * @param res
 * @returns {*}
 */

const getQrCodeAppartement = async (req, res) => {
    const appartments = await db.appartments.findOne({where: { qrcode: req.body.qrcode }});
    res.json({ 'data': appartments })
};

const getAppartementNum = async (req, res) => {
      const appartments = await db.appartments.findOne({where: {numeros: req.params.numeros},
        include: [
            {
                model: db.pieces,
                include: [
                    {model: db.equipments},
                ]
            }
        ]
    });

    if(appartments !== null){
        let id_appartement = appartments.id;
        const existUser = await db.users.findOne({ where: { appartmentId: id_appartement,actif: 1 }});
        if(existUser === null){
            res.json({
                'success':true,
                'data': appartments
            })
        }else{
            res.json({
                'success':false,
                'message': 'Appartement occupé'
            })
        }
    }else{
        res.json({
            'success':false,
            'message': 'Appartement innexistant'
        })
    }
};


const getAppartementId = async (req, res) => {
    const appartments = await db.appartments.findByPk(req.params.id,
        {
            include: [
                {
                    model: db.pieces,
                    include: [
                        {model: db.equipments},
                    ]
                }
            ]
        });
    res.json({ 'data': appartments })
};



module.exports = {
    getQrCodeAppartement,
    getAppartementNum,
    getAppartementId
};
