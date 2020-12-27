import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongosse from 'mongoose';
import userRoutes from './routes/user';

/**
 * This file is basically a "middlewar" we use express as middlewar
 */
const NAMESPACE = 'Server';
const router = express();

/** Connect to Mongo */
mongosse
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connect to MongoDB');
    })
    .catch((error) => {
        logging.info(NAMESPACE, error.message, error);
    });

/** Logging the request */
router.use((req, res, next) => {
    //req.socket.remoteAddress ip address of req if existe
    logging.info(NAMESPACE, ` METHOD - [${req.method}], URL - [${req.url}]. IP - [${req.socket.remoteAddress}]`);

    // Response : Listener of anytime response is finish fire this function
    res.on('finish', () => {
        logging.info(NAMESPACE, ` METHOD - [${req.method}], URL - [${req.url}]. IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

/** Parse the request */
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
// { extended: false } send nasty json
router.use(bodyParser.urlencoded({ extended: false }));
// allow to not have to call parser for each req
router.use(bodyParser.json());

/** Rules of our API */

// CORS management
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // IN PRODUCTION API DO NOT HAVE THIS, DEFNIED YOUR IP
    console.log('In production should not have Access-Control-Allow-Origin = * but ip instead');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // If req verb is OPTIONS we return allow methods accepted of api in the header as info
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */

router.use('/users', userRoutes);

/** Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, ` Server running on ${config.server.hostname}:${config.server.port}`));
