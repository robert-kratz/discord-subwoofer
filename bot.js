const Discord = require('discord.js');
const fs = require('fs');

const mongoose = require('mongoose');
const Guild = require('./schem/guild');
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmd').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./cmd/${file}`);
	client.commands.set(command.name, command);
}

client.on('guildCreate', async member => {
    await Guild.schem.exists({id: message.guild.id}, (err, doc) => {
        if(err) return console.log(err);
        if(!doc) {
            Guild.createGuild(message.guild);
        }
    });
});

client.on('message', async message => {

    if(!message.content.startsWith('!') || message.author.bot) return;
    
    if(message.channel.type === 'dm') return;

	const args = message.content.slice(1).trim().split(/ +/);
    const cmdname = args.shift().toLowerCase();

    const command = client.commands.get(cmdname)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdname));
    
    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
	    return message.reply('I can\'t execute that command inside DMs!');
    }

	try {
        //if(config.admins.find(admin => admin === message.member.id) != undefined) return;

		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There seems to be a problem with the bot, please contact the support to fix the issiue.');
	}
});

if(require('./settings.json').autostart) {
    client.login(require('./config.json').token).then(() => {
        client.user.setPresence({ 
            activity: { 
                name: 'nobody.',
                type: 'WATCHING',
                url: 'https://amongus.rjkstudios.com/'
            }, 
            status: 'idle'
        }).catch(console.error);
        console.log('[Bot] Bot logged in with ' + client.user.username);
    }).catch(console.error);
}

module.exports = {
    client
}