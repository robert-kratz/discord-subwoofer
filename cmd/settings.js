const mongoose = require('mongoose');
const Discord = require('discord.js');
const Guild = require('../schem/guild');
const {router, id} = require('../settings.json');

module.exports = {
	name: 'settings',
    description: 'this is the settings command.',
    aliases: ["s"],
    guildOnly: true,
    execute (message, args) {
        if(args.length == 1 && args[0] === 'reload') {
            Guild.schem.exists({id: message.guild.id}, (err, doc) => {
                if(err) return console.log(err);
                if(!doc) {
                    Guild.createGuild(message.guild);
                }
            });
            message.reply('hot reloaded :fire:');   
        }
	},
};