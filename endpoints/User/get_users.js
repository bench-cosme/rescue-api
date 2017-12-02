const
    User = require('../../models/user'),
    {
    SERVER_ERROR,
        NOT_FOUND
} = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        findUsers = () => {
            return User.find()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        };


    async function main() {
        try {
            const f = await findUsers()
            res.send(200, { data: f });
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    main();


};
