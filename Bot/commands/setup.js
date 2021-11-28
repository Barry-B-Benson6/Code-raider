const { MessageAttachment, MessageEmbed } = require('discord.js');

const join = require('./buttons/join.js').varToExport;
const EndStart = require('./buttons/endStart.js').varToExport;

module.exports = {
    name: 'setup',
    description: "used to create raid",
    execute(message, args, command, session) {

        if (command === 'setup' && !session.insetup) {

            const exampleEmbed = new MessageEmbed()
                .addField('Raid Starter', 'When you are ready the creator can use -start to start the raid');
    
            message.channel.send({ embeds: [exampleEmbed], components: [EndStart, join] }).then(mymsg => {
                session.setupmsg = mymsg;
            })
    
            session.creator = message.author.id;
            session.insetup = true;
            message.delete(1000);
    
        }
        else if (command === 'setup' && session.insetup){
            message.author.send('wait for the current raid to end before starting another').then(newmsg => {
                session.WarningMessages[session.WarningMessages.length] = newmsg;
            });
            message.delete(1000);
        }
    }
}