"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
exports.secret = process.env.JWT_SECRET || '9u8nnjksfdt98*(&*%T$#hsfjk';
var ttl = 3600 * 4; // jwt valid for 4 hours
exports.sign = function (data) {
    return jwt.sign({ data: data }, exports.secret, { expiresIn: ttl });
};
exports.verify = function (token) {
    return jwt.verify(token, exports.secret);
};
