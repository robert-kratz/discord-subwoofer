const express = require('express');
const router = express.Router();

const {client} = require('../bot.js');

router.get('/start', (req, res) => {
    res.status(200).json({"status": 200, "message": "The bot started"});
    client.login(require('../config.json').token).then(() => {
        
    });
});

router.get('/stop', (req, res) => {
    res.status(200).json({"status": 200, "message": "This bot stopped"});
    client.destroy();
});

router.get('/status', (req, res) => {
    res.status(200).json({"status": 200, "message": "The bot started"});
    client.login(require('../config.json').token).then(() => {
        console.log('[Bot] Bot logged in with ' + require('../config.json').token.substring(0, 10) + '****');
    });
});

module.exports = router;