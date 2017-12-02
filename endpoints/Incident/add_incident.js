const
    Incident = require('../../models/incident'),
    {
        SERVER_ERROR,
        CONFILCT_ERROR
    } = require('../../utils/errors');


module.exports = (req, res, next) => {

    const
        input = Object.assign({}, req.body),
        { name } = input;

    const
        createIncident = () => {
            const incident = new Incident(input);
            return incident.save()
                .then(data => data)
                .catch(err => {
                    throw err;
                });
        },

        checkName = () => {
            return Incident.findOne({
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
                const f = await createIncident();
                res.send(200, { data: f });
            }
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }

    main();


};
