const express = require('express');
const jwt = require('jsonwebtoken');
const RequestLog = require('../schem/logger');

//const Log = require('../schem/logger');

const router = express.Router();

router.post('/authorize', (req, res) => {

    //REQUEST VALIDATION
    if(!req.body.access) return respond(req, res, 400, "No token provided", {});

    //VALIDATE ACCESS TOKEN
    if(req.body.access != require('../config.json').access) return res.status(401).json({"message": "Wrong authorization access", "data": {}});

    //CREATE TOKENS
    const token = jwt.sign({data: {name: "name"}, expiresIn: '1h'}, require('../config.json').secret);
    const refresh = jwt.sign({data: {name: "name"}, expiresIn: '10h'}, require('../config.json').secret);

    res.status(200).json({"message": "Access granted", "data":{"token": token, "refreshtoken": refresh}});
});

router.post('/refresh', (req, res) => {
    
    //REQUEST VALIDATION
    if(!req.body.token || !req.body.refreshtoken) return res.status(400).json({"message": "No token provided", "data": {}});

    //VALIDATION CHECK OF TOKEN
    try { jwt.verify(req.body.token, require('../config.json').secret); } catch(err) { return res.status(400).json({"message": "Token isin valid", "data": {}}); }

    //VALIDATION CHECK OF TOKEN
    try { jwt.verify(req.body.refreshtoken, require('../config.json').secret); } catch(err) { return res.status(400).json({"message": "Refreshtoken is invalid", "data": {}}); }

    const token = jwt.sign({data: {name: "name"}, expiresIn: '1h'}, require('../config.json').secret);
    const refresh = jwt.sign({data: {name: "name"}, expiresIn: '10h'}, require('../config.json').secret);

    res.status(200).json({"message": "Token refreshed", "data":{"token": token, "refreshtoken": refresh}});
});

function respond(req, res, status, message, data) {

    const entry = new RequestLog({
        date: Date.now,
        ip: "1234",
        path: req.url,
        respond: {
            status: status,
            message: message,
            data: data
    }});

    entry.save().then(() => console.log('Schemetic created'));

    return res.status(status).json({"message": message, "data": data});
}

module.exports = router;