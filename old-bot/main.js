const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });
const prefix = '-';
let Currentplayers = [];
let Currentplayerids = [];
let playermsgs = [];
let Playercodes = [];
let insetup = Boolean(false)
let inraid = Boolean-(false);
let currentcode = 515;
const allCodes = require('./codes.js').varToExport;
const { MessageActionRow, MessageButton } = require('discord.js');
let creator = Discord.user;
var setupmsg = Discord.message;
const { MessageAttachment, MessageEmbed } = require('discord.js');
let WarningMessages = [];

const playermsgbuttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('playermsgbuttons')
            .setLabel('Next')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('correct')
            .setLabel('Got it')
            .setStyle('SUCCESS'),
    );
const setupButtons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('join')
            .setLabel('Join')
            .setStyle('PRIMARY'),
    )
const EndStart = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('start')
            .setLabel('Start Raid')
            .setStyle('SUCCESS'),
    )
    .addComponents(
        new MessageButton()
            .setCustomId('end')
            .setLabel('End Raid')
            .setStyle('DANGER'),
    );


client.once('ready', () => {
    console.log('Cinnaraider is up');
});

client.on('messageCreate', message => {



    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'setup' && !insetup) {

        const exampleEmbed = new MessageEmbed()
            .addField('Raid Starter', 'When you are ready the creator can use -start to start the raid');

        message.channel.send({ embeds: [exampleEmbed], components: [EndStart, setupButtons] }).then(mymsg => {
            setupmsg = mymsg;
        })

        creator = message.author.id;
        insetup = true;
        message.delete(1000);

    }
    else if (command === 'setup' && insetup){
        message.author.send('wait for the current raid to end before starting another').then(newmsg => {
            WarningMessages[WarningMessages.length] = newmsg;
        });
        message.delete(1000);
    }
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'playermsgbuttons') {

        const codeMessage = new MessageEmbed()
            .setTitle('Code')
            .addField('\u200B', `${allCodes[currentcode]}`);

        interaction.update({ embeds: [codeMessage], components: [playermsgbuttons] });

        for (player in Currentplayerids){
            if (Currentplayerids[player] === interaction.user.id){
                Playercodes[player] = allCodes[currentcode];
                console.log(Playercodes[player]);
            }
        }

        currentcode += 1;

    }
    else if (interaction.customId === 'join') {

        for (player in Currentplayers) {
            if (Currentplayers[player] === interaction.user.username) {
                interaction.user.send("you have already joined wait for the creator to start the raid").then(newmsg => {
                    WarningMessages[WarningMessages.length] = newmsg;
                });
                return interaction.deferUpdate()
            }
        }
        Currentplayers[Currentplayers.length] = interaction.user.username;
        Currentplayerids[Currentplayerids.length] = interaction.user.id;

        console.log(Currentplayerids);

        let stringName = '';

        for (player in Currentplayers) {

            stringName = `${stringName} \n ${Currentplayers[player]}`

        }

        const setupmsg = new MessageEmbed()
            .addFields(
                { name: 'Raid Starter', value: 'When you are ready the owner of the raid can use -start to start the raid' },
                { name: 'Current players', value: stringName }
            )

        if (inraid) {

            const codeMessage = new MessageEmbed()
                .setTitle('Code')
                .addField('\u200B', `${allCodes[currentcode]}`);

            interaction.user.send({ embeds: [codeMessage], components: [playermsgbuttons] })


            for (player in Currentplayerids){
                if (Currentplayerids[player] === interaction.user.id){
                    Playercodes[player] = allCodes[currentcode];
                }
            }

            currentcode += 1;
        }

        interaction.update({ embeds: [setupmsg] });


    }
    else if (interaction.customId === 'start') {
        if (interaction.user.id === creator) {
            if (Currentplayers[0] === null) {
                interaction.user.send('Cannot start raid until at least 1 person is in the raid').then(newmsg => {
                    WarningMessages[WarningMessages.length] = newmsg;
                });
                return interaction.deferUpdate()
            }


            for (id in Currentplayerids) {

                const codeMessage = new MessageEmbed()
                    .setTitle('Code')
                    .addField('\u200B', `${allCodes[currentcode]}`);

                client.users.fetch(`${Currentplayerids[id]}`).then(user => user.send({ embeds: [codeMessage], components: [playermsgbuttons] }).then(dm => {
                    playermsgs[playermsgs.length] = dm;
                }));

                for (player in Currentplayerids){
                    if (Currentplayerids[player] === interaction.user.id){
                        Playercodes[player] = allCodes[currentcode];
                    }
                }

                currentcode += 1;
            }

            inraid = true;
            return interaction.deferUpdate()
        }
        else {
            interaction.user.send("Only the owner of the raid can start it").then(newmsg => {
                WarningMessages[WarningMessages.length] = newmsg;
            });
            return interaction.deferUpdate()
        }
    }
    else if (interaction.customId === 'end') {
        if (interaction.user.id === creator){
            setupmsg.delete(1000);
            setupmsg.channel.send('the raid has ended');
            for (message in playermsgs){
                playermsgs[message].delete(1000);
            }
            inraid = false;
            insetup = false;
            creator = Discord.user;
            currentcode = 0;
            playermsgs = [];
            Currentplayers = [];
            Currentplayerids = [];
            Playercodes = [];
            for (msg in WarningMessages){
                WarningMessages[msg].delete(1000);
            }
            return interaction.deferUpdate()
        }
        else {
            interaction.user.send('Only the owner of the raid can end it').then(newmsg => {
                WarningMessages[WarningMessages.length] = newmsg;
            });
            return interaction.deferUpdate()
        }
    }
    else if (interaction.customId === 'correct'){
        for (id in Currentplayerids){
            if (interaction.user.id === Currentplayerids[id]){

                const confirm = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('confirm')
                    .setLabel('yes')
                    .setStyle("SUCCESS")
                )
                .addComponents(
                    new MessageButton()
                    .setCustomId('no')
                    .setLabel('no')
                    .setStyle("DANGER")
                );

                const correctCode = new MessageEmbed()
                .setTitle('Are you sure you got it?')

                interaction.update({embeds: [correctCode], components: [confirm]})
            }
        }
    }
    else if (interaction.customId === 'confirm'){
        for (id in Currentplayerids){
            if (Currentplayerids[id] === interaction.user.id){

                const correctCode = new MessageEmbed()
                .setTitle('Code found')
                .addField(`${Playercodes[id]}`, `${Currentplayers[id]}`)
                .setColor('GREEN');

                for (message in playermsgs){


                    playermsgs[message].delete(1000);
                    playermsgs[message].channel.send({embeds: [correctCode]}).then(newmsg => {
                        playermsgs[message] = newmsg;
                    })
                }

                const endRaid = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('end')
                        .setLabel('End Raid')
                        .setStyle('DANGER'),
                );

                setupmsg.delete(1000);
                setupmsg.channel.send({embeds: [correctCode], components: [endRaid]}).then(newmsg => {
                setupmsg = newmsg;
                })
            }
        }
        return interaction.deferUpdate();
    }
    else if (interaction.customId === 'no'){
        for (id in Currentplayerids){
            if (interaction.user.id === Currentplayerids[id]){

                const codeMessage = new MessageEmbed()
                .setTitle('Code')
                .addField('\u200B', `${Playercodes[id]}`);

                interaction.update({embeds: [codeMessage], components: [playermsgbuttons]})
            }
        }
    }

    return;


});

client.login('OTEyNTI3NDA3NjM2OTcxNTIx.YZxPXw.y20t1RKww02K7MHAZl-4fKiyJAk');