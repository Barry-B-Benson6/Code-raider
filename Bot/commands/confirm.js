const { MessageAttachment, MessageEmbed } = require('discord.js');

const end = require('./buttons/playermsgbuttons.js').varToExport;

module.exports = {
    name: 'confirm',
    description: "confirm the correct code",
    execute(interaction, session,guildId) {
        console.log(session.Currentplayerids);
        for (id in session.Currentplayerids){
            console.log('1');
            if (session.Currentplayerids[id] === interaction.user.id){

                const correctCode = new MessageEmbed()
                .setTitle('Code found')
                .addField(`${session.Playercodes[id]}`, `${session.Currentplayers[id]}`)
                .setColor('GREEN');

                for (message in session.playermsgs){

                    console.log(session.Currentplayerids[message]);

                    session.playermsgs[message].delete(1000);
                    session.playermsgs[message].channel.send({embeds: [correctCode]}).then(newmsg => {
                        session.playermsgs[message] = newmsg;
                    })
                }

                session.setupmsg.delete(1000);
                session.setupmsg.channel.send({embeds: [correctCode], components: [end]}).then(newmsg => {
                session.setupmsg = newmsg;
                })
            }
        }
        return interaction.deferUpdate();
    }
}