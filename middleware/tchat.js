const db = require('../models')

const save = async (messages) => {
    let data = {
        message: messages.message,
        idsender: messages.idsender,
        idreceiver: messages.idreceiver,
        interventionId: messages.interventionId,
        emailSender: messages.emailSender
    };
    const message = await db.messageChats.build(data)
    // if (!messages.idsender) {
    //     return false;
    // } else {
        message.save();
        return true;
    // }
}


const getChatInterventions = async (req, res) => {
    //console.log(req.body)
    const response = await db.messageChats.findAll({
        where: {
            interventionId: req.body.interventionId,
            // userMec: req.body.userMec,
        },
        include: [
            { model: db.fileChats },
            { model: db.users },
            { model: db.interventions },
        ]
    })
    res.json({ 'data': response })
}


const getChatByidreceiver = async (req, res) => {
    //console.log(req.body)
    const response = await db.messageChats.findAll({
        where: {
            idreceiver: req.body.idreceiver,
            // userMec: req.body.userMec,
        },
        include: [
            { model: db.fileChats },
            { model: db.users },
            { model: db.interventions },
        ]
    })
    res.json({ 'data': response })
}


module.exports = { save, getChatInterventions, getChatByidreceiver };
