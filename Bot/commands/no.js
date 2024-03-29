const { MessageAttachment, MessageEmbed } = require('discord.js');

createPlayerMsgButtons = require('./buttons/playermsgbuttons.js').varToExport;

module.exports = {
    name: 'no',
    description: "i do not confirm",
    execute(interaction, session) {
        for (id in session.Currentplayerids) {
            if (interaction.user.id === session.Currentplayerids[id]) {

                const codeMessage = new MessageEmbed()
                    .setTitle('Code')
                    .addField('\u200B', `${session.Playercodes[id]}`);

                interaction.update({ embeds: [codeMessage], components: [createPlayerMsgButtons(session.guildId)] })
            }
        }
    }
}