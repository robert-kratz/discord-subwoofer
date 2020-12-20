const express = require('express');
const uniqid = require('uniqid');
const mongoose = require('mongoose');
const morgan = require('morgan');
const axios = require('axios');


const app = express();
var connection = mongoose.connection;
var timer, instances = [];

app.use(morgan('combined'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

console.log('[Process] New instance session started: ' + uniqid('s-'));
pingInstances();

const uri = "mongodb+srv://root:" + require('./config.json').db + "@profile.2ihdb.mongodb.net/bot?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('[DB] Database connection successfull');
  connection = mongoose.connection;
});

connection.once('error', (err) => {
    console.log('[DB] Error: ' + err);
});

connection.once('open', () => {
    console.log('[DB] Connection stable and running');
});

//API ROUTING
app.use('/api', require('./router/api'));
app.use('/api/bot', require('./router/bot'));
app.use('/api/auth', require('./router/auth'));

app.listen(require('./settings.json').webport, (req, res) => {
    console.log("[Webserver] API startet on port " + require('./settings.json').webport);
});

function pingInstances() {
    timer = setInterval(() =>{
        var s = 0, f = 0;
        instances.forEach(element => {
            axios.post('http://' + element.ip + ':' + element.port + '/api/status/ping', {date: Date.now()}).then(res => {
                if(res.status == 200) {
                    console.log(res.data);
                    s++;
                } else {
                    f++;
                }
                }).catch(err => {
                    f++;
                    console.log(err);
                });
        });
        console.log('[Process] Pinged ' + instances.length + ' servers ' + s + ':200 | ' + f + ':400 | Time ' + Date.now());
    },  30 * 1000); //30sek
}

module.exports = {
    connection
};