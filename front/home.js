const path = require('path');

 
/**
 * envoie le fichier index.htmh
 * @param {*} req 
 * @param {*} res 
 */
function page(req, res) {
 
    res.sendFile(path.join(__dirname + '/front/index.html'));
}

/**
 * envoie le dossier racine du front
 * @param {*} req 
 * @param {*} res 
 */
function pagedir(req, res) {
 
    res.sendFile(path.join(__dirname + '/front'));
}



module.exports = { page , pagedir};
