const Discord = require('discord.js');

module.exports = {
    name: 'end',
    description: "used to end raid",
    execute(interaction, session,guildId) {

        if (interaction.user.id === session.creator){
            session.setupmsg.delete(1000);
            session.setupmsg.channel.send('the raid has ended');
            for (message in session.playermsgs){
                session.playermsgs[message].delete(1000);
            }
            session.inraid = false;
            session.insetup = false;
            session.creator = Discord.user;
            session.currentcode = 0;
            session.playermsgs = [];
            session.Currentplayers = [];
            session.Currentplayerids = [];
            session.Playercodes = [];
            for (msg in session.WarningMessages){
                session.WarningMessages[msg].delete(1000);
            }
            return interaction.deferUpdate()
        }
        else {
            interaction.user.send('Only the owner of the raid can end it').then(newmsg => {
                session.WarningMessages[session.WarningMessages.length] = newmsg;
            });
            return interaction.deferUpdate()
        }

    }
}