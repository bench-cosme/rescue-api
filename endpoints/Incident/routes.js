const api = module.parent.exports.api;

const

    //incident
    add = require('./add_incident'),
    // rm = require('./delete_incident'),
    // edit = require('./edit_incident'),
    // get_all = require('./get_incidents'),
    get_one = require('./get_incident');

//bank


// api.get({ path: 'incident' },
//     get_all
// );

api.get({ path: 'incident/:name' },
    get_one
);

api.post({ path: 'incident' },
    add
);

// api.patch({ path: 'incident/:_id' },
//     edit
// );