const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    requiredString = (required = true) => ({ type: String, required });

const foundation = new Schema({
    name: requiredString(),
    email: requiredString(),
    img: requiredString(),
    description: requiredString(),
    account_details: [{
        bank: requiredString(),
        account_name: requiredString(),
        account_number: requiredString()
    }],
    status: { type: Boolean, default: true } //will become false once deleted
});

module.exports = mongoose.model('Foundations', foundation);