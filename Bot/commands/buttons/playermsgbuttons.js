const { MessageActionRow, MessageButton } = require('discord.js');

function createPlayerMsgButtons(guildId) {
    return new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('next_' + guildId)
            .setLabel('Next')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('correct_' + guildId)
            .setLabel('Got it')
            .setStyle('SUCCESS'),
    );
}


module.exports = { varToExport: createPlayerMsgButtons};