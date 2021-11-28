const { MessageActionRow, MessageButton } = require('discord.js');

const confirm = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setCustomId('confirm')
    .setLabel('yes')
    .setStyle("SUCCESS")
)
.addComponents(
    new MessageButton()
    .setCustomId('no')
    .setLabel('no')
    .setStyle("DANGER")
);

module.exports = { varToExport: confirm};