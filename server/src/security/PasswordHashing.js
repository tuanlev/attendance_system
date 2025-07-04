const crypto = require('crypto');

exports.passwordEncoder = (password) => {
    return crypto.createHash('sha512').update(password).digest('hex');
};

exports.passwordVerifier = (password, hash) => {
    console.log(password,hash,)
    return password == hash;
};