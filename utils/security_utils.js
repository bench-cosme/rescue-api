const jwt = require('jsonwebtoken'),
    { UNAUTHORIZED } = require('./errors');

//generate JWT access token
exports.generateAppAccessToken = (payload) => {
    let key = "dsds";
    return jwt.sign(payload, key, { expiresIn: '365d' });
};

//validate JWT access token
exports.validateAppToken = (req, res, next) => {
    // console.log(req.headers);
    var
        token = req.headers['x-access-token'] || undefined,

        key = "dsds",
        //jwt verify callback
        verifyCb = (err, tokenData) => {
            if (!err) {
                next();
            } else {
                res.send(UNAUTHORIZED);
            }
        }

    // console.log(token)
    if (token) {
        jwt.verify(token, key, verifyCb);
    }
    else {
        sendResponse(
            res,
            403,
            CODE_FORBIDDEN,
            "Invalid access token"
        );
    }
};

exports.decodeToken = (token) => {
    return jwt.decode(token);
}
