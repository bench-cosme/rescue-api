const
    mongoose = require('mongoose'),
    Schema = require('mongoose').Schema;


const
    //mongoDB connect
    dbconn = (callback) => {
        var URI = process.env.MONGODB_URI;
        mongoose.connect(URI, { config: { autoIndex: false } }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    };

module.exports = {
    dbconn
};