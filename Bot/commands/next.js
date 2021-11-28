const { MessageAttachment, MessageEmbed } = require('discord.js');

const playermsgbuttons = require('./buttons/playermsgbuttons.js').varToExport;

module.exports = {
    name: 'next',
    description: "used to get next code",
    execute(interaction, session) {
        const codeMessage = new MessageEmbed()
            .setTitle('Code')
            .addField('\u200B', `${session.allCodes[session.currentcode]}`);


        interaction.update({ embeds: [codeMessage], components: [playermsgbuttons] });

        for (player in session.Currentplayerids){
            if (session.Currentplayerids[player] === interaction.user.id){
                session.Playercodes[player] = session.allCodes[currentcode];
                console.log(Playercodes[player]);
            }
        }

        session.currentcode += 1;
    }
}