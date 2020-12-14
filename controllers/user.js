const config = require('../config/app');
const Hash = require('crypto-js/pbkdf2');
const { sendmail } = require('../middleware/emailService');
const db = require("../models");
const codeSejour = require('../middleware/codeSejour');


const inscription = async (req, res) => {
    const appartments = await db.appartments.findOne({ where: { numeros: req.body.appartmentId }});
    if(appartments !== null){
        let id_appartement = appartments.id;
        const existUser = await db.users.findOne({ where: { appartmentId: id_appartement,actif: 1 }});
        if(existUser === null){
            db.users.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                role:"CLIENT",
                date_end_sejour: req.body.date_end_sejour,
                code_sejour: codeSejour.makeid(6),
                appartmentId: id_appartement,
                actif: 1
            }).then(async (rep) =>{
                if(rep.dataValues) {
                    //get data appartement
                    const appartments = await db.appartments.findByPk(rep.dataValues.appartmentId,
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
                    //creer caution
                    db.caution.create({
                        userId: rep.dataValues.id,
                        appartmentId: appartments.id,
                        initial: appartments.caution,
                        retenu: 0,
                        remborsee: appartments.caution,
                    });
                    res.json({
                        'success':true,
                        'users': rep.dataValues,
                        'data': appartments
                    })
                }
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

const reinitialisation = async (req, res) => {
    let mdp = Hash(req.body.password, config.appSecret).toString();
    console.log(mdp)
    const user = await db.users.findOne({ where: { code_sejour: req.body.code_sejour,password:mdp },
        include: [
            {
                model: db.appartments,
            }
        ]
    });
    if(user !== null){
        res.json({
            'success':true,
            'data': user
        })
    }else{
        res.json({
            'success':false,
            'message': 'Code de séjour ou mot de passe incorrect'
        })
    }

};


module.exports = {
    inscription,
    reinitialisation
};
