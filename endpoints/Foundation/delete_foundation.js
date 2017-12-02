const
    Foundation = require('../../models/foundation'),
    {
        SERVER_ERROR,
        NOT_FOUND
    } = require('../../utils/errors');


module.exports = (req, res, next) => {

    const { _id } = req.params;

    const
        findFoundation = () => {
            return Foundation.findById(_id)
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        removeFoundation = (foundation) => {
            return foundation.remove()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            const f = await findFoundation();
            if (f) {
                await removeFoundation(f);
                res.send(200);
            } else {
                res.send(NOT_FOUND);
            }
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    main();


};
