const { MessageAttachment, MessageEmbed } = require('discord.js');

createConfirmButtons = require('./buttons/confirmButtons.js').varToExport;

module.exports = {
    name: 'correct',
    description: " when correct button is pushed, sends confirmation question",
    execute(interaction, session) {

        const correctCode = new MessageEmbed()
            .setTitle('Are you sure you got it?')

        interaction.update({ embeds: [correctCode], components: [createConfirmButtons(session.guildId)] })
    }
}