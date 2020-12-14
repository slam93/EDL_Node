const db = require('../models')
const fs = require('fs')
const { date } = require('joi')

/**
* @param req
* @param res
* @returns {*}
*/

const convertDate = (date) => {
    let year = date.getFullYear()
    let montth = date.getMonth()
    let day = date.getDay()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconde = date.getSeconds()  
    return (year + '' +  montth + '' + day + '-' + hour + '' + minutes + '' + seconde)
}

const uploadFiles = async (req, res) => {

    console.log(req.files)

    try {
        console.log('==+> image', req.files)

        if (req.files == undefined) {
            return res.send(`image tsy hita`)
        }

        let image = req.files.data;

        db.uploadImages.create({
            type: req.files.data.mimetype,
            name: req.files.data.name,
            // data: req.files.data.name,
        }).then(() => {
            image.mv(process.cwd() + '/uploads/images/' + convertDate(new Date()) + '-' + image.name);
            // fs.writeFileSync(process.cwd() + "/uploads/images/" + image.name, image.data)
            return res.send(
                {
                    'message':'Image uploaded !!!', 
                    'nameFile': convertDate(new Date()) + '-' + image.name
                })
        })
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`)
    }
}

module.exports = {
    uploadFiles
}


                
