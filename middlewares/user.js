const jwt = require('jsonwebtoken');
const secret=require('../app');
const { JWT_SECRET } = require('../config');
function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedvalue = jwt.verify(jwtToken,  JWT_SECRET);
    if(decodedvalue.username){
        req.username = decodedvalue.username;
        next();
    }else{
        res.status(403).send('Unauthorized');
    }

}

module.exports = userMiddleware;
