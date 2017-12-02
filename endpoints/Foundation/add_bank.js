const
    Foundation = require('../../models/foundation'),
    {
        SERVER_ERROR,
        NOT_FOUND
    } = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        bank = Object.assign({}, req.body),
        { foundation_id } = req.params;

    const
        saveFoundation = (foundation) => {
            foundation.account_details
                .push(bank)
            return foundation.save()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        checkFoundation = () => {
            return Foundation.findById(foundation_id)
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            const f = await checkFoundation();
            if (f) {
                const r = await saveFoundation(f);
                res.send(200, r);
            } else {
                res.send(NOT_FOUND);
            }
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    main();


};
