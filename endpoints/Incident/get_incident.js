const
    Incident = require('../../models/incident'),
    {
SERVER_ERROR,
        NOT_FOUND
} = require('../../utils/errors');


module.exports = (req, res, next) => {

    const { name } = req.params;

    findIncident = () => {
        return Incident.findOne({name})
            .then(data => data)
            .catch(err => {
                throw err;
            });
    };

    async function main() {
        try {
            const f = await findIncident();
            if (f) {
                res.send(200, { data: f });
            } else {
                res.send(NOT_FOUND);
            }
        } catch (e) {
            console.log(e);
            res.send(SERVER_ERROR);
        }
    }

    main();


};
