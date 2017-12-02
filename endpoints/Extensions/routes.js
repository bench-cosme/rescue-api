const api = module.parent.exports.api;

const
    redirect = require('./redirect');

api.get({ path: '/extensions/redirect' },
    redirect
)