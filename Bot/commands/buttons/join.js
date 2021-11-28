const { MessageActionRow, MessageButton } = require('discord.js');

function createJoinButton(guildId) {
    btn = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('join_' + guildId)
            .setLabel('Join')
            .setStyle('PRIMARY'),
    );
    return btn;
}

module.exports = { varToExport: createJoinButton};