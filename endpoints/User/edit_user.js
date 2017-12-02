const
    User = require('../../models/user'),
    {
        SERVER_ERROR,
        NOT_FOUND
    } = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        input = Object.assign({}, req.body),
        { fb_id } = req.params;

    const
        finduser = () => {
            return User.findOne({fb_id})
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        saveuser = (user) => {
            const newuser = Object.assign(user, input);
            return newuser.save()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        }

    async function main() {
        try {
            const f = await finduser()
            if (f) {
                await saveuser(f);
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
