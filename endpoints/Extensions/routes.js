const api = module.parent.exports.api;

const
    redirect = require('./redirect');

api.get({ path: '/oauth2/callback' },
    redirect
);
