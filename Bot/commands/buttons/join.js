const { MessageActionRow, MessageButton } = require('discord.js');

const join = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('join')
            .setLabel('Join')
            .setStyle('PRIMARY'),
    );


module.exports = { varToExport: join};