const api = module.parent.exports.api;

const

    //foundation
    add = require('./add_foundation'),
    rm = require('./delete_foundation'),
    edit = require('./edit_foundation'),
    get_all = require('./get_foundations'),
    get_one = require('./get_foundation');

//bank

const
    //foundation
    add_bank = require('./add_bank'),
    rm_bank = require('./remove_bank');


api.get({ path: 'foundation' },
    get_all
);

api.get({ path: 'foundation/:_id' },
    get_one
);

api.post({ path: 'foundation' },
    add
);

api.patch({ path: 'foundation/:_id' },
    edit
);

api.del({ path: 'foundation/:_id' },
    rm
);

api.post({ path: 'foundation/bank/:foundation_id' },
    add_bank
);

api.patch({ path: 'foundation/bank/:foundation_id/:bank_id' },
    rm_bank
);