const { MessageActionRow, MessageButton } = require('discord.js');

const EndStart = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('start')
            .setLabel('Start Raid')
            .setStyle('SUCCESS'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('end')
            .setLabel('End Raid')
            .setStyle('DANGER'),
    );
module.exports = { varToExport: EndStart};