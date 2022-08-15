const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });

const allCode = require('./codes.js').varToExport;

const { MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');
client.commands = new Discord.Collection();

const prefix = '-';

let invc = Boolean(false);

let i = 1;

let GUILDS = []

/**
 * Contains information about the current state of a session a particular Guild.
 */
class SessionState {
    constructor(guildId) {
        this.users = Discord.UserManager;
        this.allCodes = allCode;
        this.guildId = guildId;
        this.WarningMessages = [];
        this.inraid = false;
        this.insetup = false;
        this.creator = Discord.User;
        this.currentcode = 0;
        this.playermsgs = [];
        this.Currentplayers = [];
        this.Currentplayerids = [];
        this.Playercodes = [];
        this.deleted = false;
    }
}

const sessions = new Map();

function getOrCreateSession(guildId) {
    if (!sessions.has(guildId)) {
        sessions.set(guildId, new SessionState(guildId));
    }


    sessions.get(guildId).users = client.users;

    return sessions.get(guildId);
}


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}


client.once('ready', () => {
    // let guilds = client.guilds.cache
    // guilds.forEach(g => {
    //     console.log(g.name)
    // });
    console.log('Refactor');

//    const Guilds = client.guilds.cache.map(guild => guild.name);
    //console.log(Guilds);

//    client.guilds.cache.forEach(guild => {
//        console.log(guild.name + " " + guild.id);
//        let channels = guild.channels.cache.map(channel => channel.name)
//        console.log(channels);
//    });

    let guild = client.guilds.cache.get('924076146323255296');

    let members = client.guilds.cache.map(member => guild.members);
    console.log(members);

//    let general = client.channels.cache.get('924076146323255300');

//    general.send("who the fuck names a server like that?");

//    console.log("sent");
//    let channels = guild.channels.cache.map(channel => channel.id);
//    let channelNames = guild.channels.cache.map(channel => channel.name);

//    console.log(channels);
//    console.log(channelNames);

    

    setInterval(() => {
            client.user.setActivity(`-setup to create a raid`);
    }, 2000);
});

const ServersFolders = fs.readdirSync('./Servers/').filter(file => file.endsWith('.js'));

client.on('messageCreate', message => {

<<<<<<< Updated upstream
    console.log("message recieved")

    if (message.author.bot) return;

    console.log(message)

    var channelFile = fs.mkdirSync(`./Servers/${message.guild.name}`, { recursive: true })
    console.log(message.guild.name)

    content =  `${message.author.username}: ${message.content} \n\r`

    if (message.attachments.length !== 0){
        for (const attachment of message.attachments){
            content += `    ${attachment[1].attachment} \n\r`
        }
    }
    fs.appendFile(`Servers/${message.guild.name}/${message.channel.name}.txt`,content, err => {
        if (err) {
            console.error(err)
        }
        //file written successfully
    })

    if (!message.content.startsWith(prefix)) return;
=======
    if (message.guild.guildId === 924076146323255296){
        console.log(message.content);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
>>>>>>> Stashed changes

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'setup') {
        let session = getOrCreateSession(message.guildId);
        client.commands.get('setup').execute(message, args, command, session);
    }

    if (command === 'join' && !invc){
        invc = true;
        message.user.voiceChannel.join().then(connection =>{const dispatcher = connection.play('./audio.mp3');}).catch(err => console.log(err));
    }
});

client.on("interactionCreate", (interaction) => {

    if (!interaction.isButton()) return;
    if (interaction.user.bot) return;

    parts = interaction.customId.split('_');
    let customId = parts[0];
    if (parts.length > 1) {
        let guildId = parts[1];

        if (client.commands.has(customId)) {
            let session = getOrCreateSession(guildId);
            console.log("ids" + session.Currentplayerids);
            client.commands.get(customId).execute(interaction, session);

            if (session.deleted) {
                sessions.delete(guildId);
            }
        }
        else {
            console.log('unknown customid: ' + customId);

            interaction.deferUpdate();
        }
    } else {
        console.log('No found guildId in customId: ' + interaction.customId);

        interaction.deferUpdate();
    }

});

client.login('OTEyNTI3NDA3NjM2OTcxNTIx.GioioF.M1EJM20pKSszSShEXLO3VIhxB3h-oPclIYQ-iw');
