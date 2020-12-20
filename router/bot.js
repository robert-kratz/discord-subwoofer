const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const RequestLog = require('../schem/logger');

//const Log = require('../schem/logger');

const {jsonParser} = require('../index');

router.post('/authorize', (req, res) => {    

    if(req.body.access === undefined) return res.status(400).json({"status":400});
    if(req.body.access != require('../config.json').access) return res.status(401).json({status:401});

    res.status(200).json({routerid: 99, id:99});
});

module.exports = router;