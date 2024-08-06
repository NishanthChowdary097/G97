// import  jwt  from "jsonwebtoken";
const jwt = require('jsonwebtoken')

const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '10000s',
        // expiresIn: process.env.JWT_EXPIRES_IN,
    })
    return token
}

const verifyJWT = (token) => {
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded;}
    catch{
        return null;
    }
}

module.exports = {createJWT, verifyJWT}