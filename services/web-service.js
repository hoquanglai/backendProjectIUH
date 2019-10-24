const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const morgan = require('morgan');
var product = require('../routes/product.js'); // Imports routes for the products
var address = require('../routes/address.js'); // Imports routes for the address

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);

        // Combines logging info from request and response
        app.use(morgan('combined'));

        app.use('/product', product);
        app.use('/address', address);

        app.get('/', (req, res) => {
            res.end('Hello World');
        })

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