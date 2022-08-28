const { MessageAttachment, MessageEmbed } = require('discord.js');

createJoinButton = require('./buttons/join.js').varToExport;
createEndStartButton = require('./buttons/endStart.js').varToExport;

module.exports = {
    name: 'setup',
    description: "used to create raid",
    execute(interaction,channel, command, session) {

        if (command === 'setup' && !session.insetup) {

            const exampleEmbed = new MessageEmbed()
                .addField('Raid Starter', 'When you are ready the creator can use -start to start the raid');

            channel.send({
                embeds: [exampleEmbed], components: [
                    createEndStartButton(session.guildId), createJoinButton(session.guildId)]
            }).then(mymsg => {
                session.setupmsg = mymsg;
            })
            session.creator = interaction.user.id;
            session.insetup = true;
            //message.delete(1000);

        }
        else if (command === 'setup' && session.insetup) {
            interaction.user.send('wait for the current raid on the server to end before starting another').then(newmsg => {
                session.WarningMessages[session.WarningMessages.length] = newmsg;
            });
            message.delete(1000);
        }
    }
}