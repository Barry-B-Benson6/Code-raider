const { MessageAttachment, MessageEmbed } = require('discord.js');

const join = require('./buttons/join.js').varToExport;
const EndStart = require('./buttons/endStart.js').varToExport;

module.exports = {
    name: 'setup',
    description: "used to create raid",
    execute(message, args, session) {

        const setupEmbed = new MessageEmbed()
            .addField('Raid Starter', 'When you are ready the creator can use -start to start the raid');

        message.delete(1000);
        message.channel.send({embeds: [setupEmbed], components: [EndStart,join]})
    }
}