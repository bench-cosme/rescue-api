const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    requiredString = (required = true) => ({ type: String, required });

const incident = new Schema({
    name: requiredString(),
    image_url: requiredString(),
    safetytips: [
        { tips: [] }
    ],
    hotline: requiredString(),
    references: []
});

module.exports = mongoose.model('Incident', incident);