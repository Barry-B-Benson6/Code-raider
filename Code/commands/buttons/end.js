const { MessageActionRow, MessageButton } = require('discord.js');

function createEndButton(guildId) {
    return new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('end_' + guildId)
            .setLabel('End Raid')
            .setStyle('DANGER'),
    );
}

module.exports = { varToExport: createEndButton };