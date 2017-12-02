const
    mongoose = require('mongoose'),
    Schema = require('mongoose').Schema;


const
    //mongoDB connect
    dbconn = (callback) => {
        var URI ='mongodb://werparanger:w3rp@r@ng3r@ds125556.mlab.com:25556/rescuedb';
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