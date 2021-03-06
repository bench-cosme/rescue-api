require('dotenv').config();
const
    restify = require('restify'),
    errors = require('restify-errors'),
    { dbconn } = require('./utils/database_utils'),
    fs = require('fs');

dbconn(function (err) {
    if (err)
        console.log(err);
    else
        console.log('MongoDB successfully connected to: ', process.env.MONGODB_URI);
});

//create server
var api = restify.createServer();
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.queryParser());
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.gzipResponse());

/** CORS SETUP */
api.use(
    function crossOrigin(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    }
);

function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'x-access-token'];

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', res.methods.join(', '));
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send(204);
    }
    else
        return res.send(new errors.MethodNotAllowedError('Invalid Method'));
}

api.on('MethodNotAllowed', unknownMethodHandler);

var port = process.env.PORT || 5000;
api.listen(port, function () {
    console.log('Server started @ ' + port);
});

module.exports.api = api;

//Root route
api.get('/', function (req, res) {
    res.send(200, { msg: 'Welcome to Rescue Bot' })
});

require('./endpoints/Foundation/routes');
require('./endpoints/Extensions/routes');
require('./endpoints/User/routes');
require('./endpoints/Incident/routes');
