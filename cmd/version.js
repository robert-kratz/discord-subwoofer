module.exports = {
	name: 'version',
    description: 'this is the default version command.',
	aliases: ["v"],
	guildOnly: true,
	execute(message, args) {
		message.channel.send(':open_file_folder: Project version ' + require('../package.json').version + ' running on ' + process.platform);
	},
};