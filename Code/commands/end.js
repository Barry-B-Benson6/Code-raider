const Discord = require('discord.js');

module.exports = {
    name: 'end',
    description: "used to end raid",
    execute(interaction, session) {

        if (interaction.user.id === session.creator) {
            // Set flag. This will be actioned elsewhere to remove the session...
            session.deleted = true;

            session.setupmsg.delete(1000);
            session.setupmsg.channel.send('the raid has ended');
            for (message in session.playermsgs){
                session.playermsgs[message].delete(1000);
            }
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