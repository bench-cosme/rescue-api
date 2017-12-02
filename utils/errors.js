const errors = require('restify-errors');

module.exports = {
    SERVER_ERROR: new errors.InternalServerError(),
    CONFILCT_ERROR: new errors.ConflictError(),
    NOT_FOUND: new errors.NotFoundError(),
    UNAUTHORIZED: new errors.UnauthorizedError()
};