const { MessageAttachment, MessageEmbed } = require('discord.js');

const playermsgbuttons = require('./buttons/playermsgbuttons.js').varToExport;

module.exports = {
    name: 'join',
    description: "used to join a raid",
    execute(interaction, session,guildId) {
        for (player in session.Currentplayers) {
            if (session.Currentplayers[player] === interaction.user.username) {
                interaction.user.send("you have already joined wait for the creator to start the raid").then(newmsg => {
                    WarningMessages[WarningMessages.length] = newmsg;
                });
                return interaction.deferUpdate()
            }
        }
        session.Currentplayers[session.Currentplayers.length] = interaction.user.username;
        session.Currentplayerids[session.Currentplayerids.length] = interaction.user.id;

        let stringName = '';

        for (player in session.Currentplayers) {

            stringName = `${stringName} \n ${session.Currentplayers[player]}`

        }

        const setupmsg = new MessageEmbed()
            .addFields(
                { name: 'Raid Starter', value: 'When you are ready the owner of the raid can use -start to start the raid' },
                { name: 'Current players', value: stringName }
            )

        if (session.inraid) {

            const codeMessage = new MessageEmbed()
                .setTitle('Code')
                .addField('\u200B', `${session.allCodes[session.currentcode]}`);

            interaction.user.send({ embeds: [codeMessage], components: [playermsgbuttons] })


            for (player in session.Currentplayerids){
                if (session.Currentplayerids[player] === interaction.user.id){
                    session.Playercodes[player] = session.allCodes[session.currentcode];
                }
            }

            session.currentcode += 1;
        }

        interaction.update({ embeds: [setupmsg] });

    }
}