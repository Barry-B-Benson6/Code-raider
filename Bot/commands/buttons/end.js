const { MessageActionRow, MessageButton } = require('discord.js');

const end = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('end')
        .setLabel('End Raid')
        .setStyle('DANGER'),
);

module.exports = { varToExport: end};