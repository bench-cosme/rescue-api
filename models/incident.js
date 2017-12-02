const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    requiredString = (required = true) => ({ type: String, required });

const incidents = new Schema({
    name: requiredString(),
    safetytips: requiredString(),
    hotline: requiredString()
});

module.exports = mongoose.model('Incidents', incidents);