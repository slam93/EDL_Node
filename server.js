const express = require('express');
var jwt = require('jsonwebtoken');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
var bodyParser = require("body-parser");
const app = express();

const config = require('./config/app.js');
const compression = require('compression');
const routes = require('./routes');
const errorHandler = require('express-json-errors');
const middlewareErrorParser = require('./middleware/ErrorParser');
const middlewarePathLogger = require('./middleware/PathLogger');
const tchat = require('./middleware/tchat');

// import Modal for ORM
const db = require("./models");

app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: false }));

var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
const DIR = './uploads';
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/front'));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// params cors utile pour ORM execution => origin
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

//execution workflow ORM => alter for update et force pour drop if exist
// db.sequelize.sync({ alter: true }).then(() => {
//     console.log("======= FIN ==========");
// });

app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/upload', upload.single('data'), (req, res, next) => {
    fs.readFile(req.file.path, (err, contents) => {
        if (err) {
            console.log('Error: ', err);
            res.send({ response: 'Error' });
        } else {
            var nom = req.file.originalname
            var url = config.baseUrl + req.file.originalname;
            var format = req.file.mimetype;
            var size = req.file.size;
            // console.log('result',{response:'Uploads OK ',statusCode:200,url:url,body:req.body,file:req.file})
            // res.status(200).send({response: 'Uploads OK ',statusCode: 200,status: 'success', body: req.body, file: req.file});
            res.send({ response: 'Uploads OK ', statusCode: 200, url: url, body: req.body, file: req.file });
        }
    });
});

app.use(fileUpload({
    createParentPath: true
}));
// comporess output
app.use(compression());

// only on debug mode
if (config.debug) {
    // path logger
    app.use(middlewarePathLogger);
}
// use routes
app.use('/', routes);

app.use(middlewareErrorParser);

// Start server
const server = app.listen(config.port, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        tchat.save(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});

// Expose app
module.exports = app;

