const
    Foundation = require('../../models/foundation'),
    {
    SERVER_ERROR,
        NOT_FOUND
} = require('../../utils/errors');


module.exports = (req, res, next) => {

    const { foundation_id, bank_id } = req.params;

    const
        saveFoundation = (foundation, index) => {
            foundation.account_details
                .splice(index, 1);
            return foundation.save()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        findBank = (foundation) => {
            return foundation
                .account_details.findIndex(ad =>
                    ad._id.toString() === bank_id
                );
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
                const bankIndex = findBank(f);
                console.log(bankIndex)
                if (bankIndex >= 0) {
                    const r = await saveFoundation(f, bankIndex);
                    res.send(200, r);
                } else {
                    res.send(NOT_FOUND);
                }
            } else {
                res.send(NOT_FOUND);
            }
        } catch (e) {
            console.log(e)
            res.send(SERVER_ERROR);
        }
    }

    main();


};
