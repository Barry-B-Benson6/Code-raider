const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });

const allCode = require('./codes.js').varToExport;

const { MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');
client.commands = new Discord.Collection();

const prefix = '-';

let i = 1;

let GUILDS = []

/**
 * Contains information about the current state of a session a particular Guild.
 */
class SessionState {
    constructor(guildId) {
        this.allCodes = allCode;
        this.guildId = guildId;
        this.inraid = false;
        this.insetup = false;
        this.creator = Discord.user;
        this.currentcode = 0;
        this.playermsgs = [];
        this.Currentplayers = [];
        this.Currentplayerids = [];
        this.Playercodes = [];
    }
}

const sessions = new Map();

function getOrCreateSession(guildId) {
    if (!sessions.has(guildId)) {
        sessions.set(guildId, new SessionState(guildId));
    }

    return sessions.get(guildId);
}

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);

}

const allCodes = require('./codes.js').varToExport;


client.once('ready', () => {
    console.log('Refactor');
});

client.on('messageCreate', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'setup') {
        let session = getOrCreateSession(message.guildId);
        client.commands.get('setup').execute(message, args, session);
    }
});

client.on("interactionCreate", (interaction) => {

    if (client.commands.has(interaction.customId)){
        let session = getOrCreateSession(interaction.guildId);
        client.commands.get(interaction.customId).execute(interaction, session)
    }
    else{
        console.log('unknown customid: ' + interaction.customId);
        
        interaction.deferUpdate();
    }

});

client.login('OTEzNzEzMjYwNDc2MzcwOTkz.YaCfyQ.1-kJgyYpf0ec7ew6PhDS7QEYBAA');