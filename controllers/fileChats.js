const db = require('../models')

/**
* @param req
* @param res
* @returns {*}
*/

const addFileChat = async (req, res) => {
    
    const fileChat = await db.fileChats.build(req.body)
    fileChat.save()
    res.json({ 'data': fileChat })
    console.log(req)
}

module.exports = {
    addFileChat
}