const
    User = require('../../models/user'),
    {
SERVER_ERROR,
        NOT_FOUND
} = require('../../utils/errors');


module.exports = (req, res, next) => {

    const { fb_id } = req.params;

    findUser = () => {
        console.log(fb_id);
        return User.findOne({ fb_id })
            .then(data => data)
            .catch(err => {
                throw err;
            });
    };

    async function main() {
        try {
            const f = await findUser();
            if (f) {
                res.send(200, { data: f });
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
