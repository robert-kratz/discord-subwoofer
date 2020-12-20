const mongo = require('mongoose');
const Discord = require('discord.js');
const client = new Discord.Client();

const Guild = new mongo.Schema({
    id: String,
    name: String,
    prefix: String,
    tier: String,
    date: {
        type: Date,
        default: Date.now
    },
    bots: [{
        id: String,
    }]
});

const schem = mongo.model('guild', Guild);

const createGuild = async function createGuild(guild) {
    const guildmodel = new schem({
        id: guild.id,
        name: guild.name,
        prefix: '!',
        tier: 'default',
        bots: [{
            id: client.id,
        }]
    });
    const savedguild = await guildmodel.save().then(() => {
        console.log('[DB] New Guild ' + guild.name + ':' + guild.id + ' created (' + guild.memberCount + ')');
    });
}

const getGuild = async function getGuild(guild) {
    
}

module.exports = {
    schem,
    createGuild,
    getGuild
}