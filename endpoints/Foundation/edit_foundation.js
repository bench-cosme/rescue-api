const
    Foundation = require('../../models/foundation'),
    {
        SERVER_ERROR,
        NOT_FOUND
    } = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        input = Object.assign({}, req.body),
        { _id } = req.params;

    const
        findFoundation = () => {
            return Foundation.findById(_id)
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        saveFoundation = (foundation) => {
            const newFoundation = Object.assign(foundation, input);
            return newFoundation.save()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        }

    async function main() {
        try {
            const f = await findFoundation()
            if (f) {
                await saveFoundation(f);
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
