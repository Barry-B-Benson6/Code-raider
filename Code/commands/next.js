const { MessageAttachment, MessageEmbed } = require('discord.js');

createPlayerMsgButtons = require('./buttons/playermsgbuttons.js').varToExport;

module.exports = {
    name: 'next',
    description: "used to get next code",
    execute(interaction, session) {
        const codeMessage = new MessageEmbed()
            .setTitle('Code')
            .addField('\u200B', `${session.allCodes[session.currentcode]}`);

        interaction.update({ embeds: [codeMessage], components: [createPlayerMsgButtons(session.guildId)] });

        for (player in session.Currentplayerids){
            if (session.Currentplayerids[player] === interaction.user.id){
                session.Playercodes[player] = session.allCodes[session.currentcode];
            }
        }

        session.currentcode += 1;
    }
}
