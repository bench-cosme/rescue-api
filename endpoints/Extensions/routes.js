const api = module.parent.exports.api;

const
    redirect = require('./redirect');

console.log("hello")

api.get({ path: '/extensions/redirect' },
    redirect
)