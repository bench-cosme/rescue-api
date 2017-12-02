const
    Foundation = require('../../models/foundation'),
    {
    SERVER_ERROR,
        NOT_FOUND
} = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        findFoundations = () => {
            return Foundation.find()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        };


    async function main() {
        try {
            const f = await findFoundations()
            res.send(200, { data: f });
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    main();


};
