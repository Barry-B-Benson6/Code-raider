const { MessageAttachment, MessageEmbed } = require('discord.js');

createPlayerMsgButtons = require('./buttons/playermsgbuttons.js').varToExport;
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });


module.exports = {
    name: 'start',
    description: "used to create raid",
    execute(interaction, session) {
        if (interaction.user.id === session.creator) {
            if (session.Currentplayers[0] === null) {
                interaction.user.send('Cannot start raid until at least 1 person is in the raid').then(newmsg => {
                    session.WarningMessages[session.WarningMessages.length] = newmsg;
                });
                return interaction.deferUpdate()
            }


            for (id in session.Currentplayerids) {

                const codeMessage = new MessageEmbed()
                    .setTitle('Code')
                    .addField('\u200B', `${session.allCodes[session.currentcode]}`);

                session.users.fetch(`${session.Currentplayerids[id]}`).then(
                    user => user.send({ embeds: [codeMessage], components: [createPlayerMsgButtons(interaction.guildId)] }).then(dm => {
                        session.playermsgs[session.playermsgs.length] = dm;
                    }));

                for (player in session.Currentplayerids) {
                    if (session.Currentplayerids[player] === interaction.user.id) {
                        session.Playercodes[player] = session.allCodes[session.currentcode];
                    }
                }

                session.currentcode += 1;
            }

            inraid = true;
            return interaction.deferUpdate()
        }
        else {
            interaction.user.send("Only the owner of the raid can start it").then(newmsg => {
                session.WarningMessages[session.WarningMessages.length] = newmsg;
            });
            return interaction.deferUpdate()
        }
    }
}