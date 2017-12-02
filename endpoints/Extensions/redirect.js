const
    Foundation = require('../../models/foundation'),
    {
    SERVER_ERROR,
        NOT_FOUND
} = require('../../utils/errors');


module.exports = (req, res, next) => {

    async function main() {
        try {
            console.log(req.query);
            res.send(200);
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    console.log("dsads")
    main();


};
