const { MessageActionRow, MessageButton } = require('discord.js');

function createConfirmButtons(guildId) {
    return new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('confirm_' + guildId)
        .setLabel('yes')
        .setStyle("SUCCESS")
    )
    .addComponents(
        new MessageButton()
        .setCustomId('no_' + guildId)
        .setLabel('no')
        .setStyle("DANGER")
    );
}

module.exports = { varToExport: createConfirmButtons };