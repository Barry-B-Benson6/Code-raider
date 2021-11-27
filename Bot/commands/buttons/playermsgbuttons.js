const { MessageActionRow, MessageButton } = require('discord.js');

const playermsgbuttons = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setCustomId('playermsgbuttons')
        .setLabel('Next')
        .setStyle('PRIMARY'),
)
.addComponents(
    new MessageButton()
        .setCustomId('correct')
        .setLabel('Got it')
        .setStyle('SUCCESS'),
);


module.exports = { varToExport: playermsgbuttons};