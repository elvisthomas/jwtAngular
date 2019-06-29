let jwt = require('jsonwebtoken');

module.exports.getToken = (id) => {
    return jwt.sign({ _id: id }, 'jwtPrimaryKey');
}

module.exports.verifyToken = (token) => {
    return jwt.verify(token, 'jwtPrimaryKey');
}