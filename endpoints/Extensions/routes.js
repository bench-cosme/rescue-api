const api = module.parent.exports.api;

const
    redirect = require('./redirect');

console.log("hello")



api.post({ path: '/extensions/redirect' },
    redirect
)