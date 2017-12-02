const api = module.parent.exports.api;

const

    //user
    add = require('./add_user')
    // rm = require('./delete_user'),
     edit = require('./edit_user'),
     get_all = require('./get_users'),
     get_one = require('./get_user');

//bank


api.get({ path: 'user' },
    get_all
);

api.get({ path: 'user/:fb_id' },
    get_one
);

api.post({ path: 'user' },
    add
);

api.patch({ path: 'user/:fb_id' },
    edit
);