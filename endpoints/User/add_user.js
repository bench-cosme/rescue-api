const
    User = require('../../models/user'),
    {
        SERVER_ERROR,
        NOT_FOUND
    } = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        input = Object.assign({}, req.body),
        { fb_id } = input;

    const
        createuser = () => {
            const user = new User(input);
            return user.save()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        checkexists = () => {
            return user.findOne({
                fb_id,
            })
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        };

    async function main() {
        try {
            if (await checkexists()) {
                res.send(CONFILCT_ERROR);
            } else {
                const f = await createuser();
                res.send(200, { data: f });
            }
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    main();


};

