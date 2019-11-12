const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const morgan = require('morgan');

const postRouter = require('../routes/post.js')
var bodyParser = require('body-parser');
var bodyParserJSON = bodyParser.json({limit: '50mb'});
var bodyParserURLEncoded = bodyParser.urlencoded({limit: '50mb', extended: true });

var product = require('../routes/product.js'); // Imports routes for the products
var address = require('../routes/address.js'); // Imports routes for the address
var user = require('../routes/user.js'); // Imports routes for the user

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();

        app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
            next();
        });
        httpServer = http.createServer(app);
        
        // var dir = path.join(__dirname, '../', 'uploads/post');
        // console.log(dir);
        
        // app.use(express.static(dir))

        // Combines logging info from request and response
        app.use(morgan('combined'));
        // Error handling
        app.use(bodyParserJSON);
        app.use(bodyParserURLEncoded);
        app.use('/product', product);
        app.use('/address', address);
        app.get('/', (req, res) => {
            res.end('Hello World');
        })
        app.use('/post', postRouter);
          app.use('/user', user);

        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web server listening on localhost:${webServerConfig.port}`);
                resolve();
            })
            .on('error', err => {
                reject(err)
            });
    })
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err)
                return;
            }
            resolve();
        })
    })
}

module.exports = {
    initialize,
    close
};