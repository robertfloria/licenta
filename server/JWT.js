const {sign, verify}= require('jsonwebtoken');

export default function createTokens (user) {
    const accesToken = sign({username: user.username, id: user.id}, "secret");
    return accesToken;
};