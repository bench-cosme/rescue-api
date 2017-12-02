const
    Foundation = require('../../models/foundation'),
    {
        SERVER_ERROR,
        CONFILCT_ERROR
    } = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        input = Object.assign({}, req.body),
        { name } = input;

    const
        createFoundation = () => {
            const foundation = new Foundation(input);
            return foundation.save()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        checkName = () => {
            return Foundation.findOne({
                name,
            })
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            if (await checkName()) {
                res.send(CONFILCT_ERROR);
            } else {
                const f = await createFoundation();
                res.send(200, { data: f });
            }
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    main();


};
