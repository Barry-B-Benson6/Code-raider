const { MessageActionRow, MessageButton } = require('discord.js');

function createEndStartButton(guildId) {
    return new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('start_' + guildId)
            .setLabel('Start Raid')
            .setStyle('SUCCESS'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('end_' + guildId)
            .setLabel('End Raid')
            .setStyle('DANGER'),
    );
}

module.exports = { varToExport: createEndStartButton };